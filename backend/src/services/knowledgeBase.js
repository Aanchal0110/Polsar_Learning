const fs = require("fs");
const path = require("path");
const vm = require("vm");
const logger = require("./logger");
const { query } = require("../config/database");

const DATA_DIR = path.join(__dirname, "../../public/infi_website/data");
const HTML_DIR = path.join(__dirname, "../../public/infi_website/HTML");

const STATIC_SOURCES = [
  { file: "books.json", page: "/infi_website/HTML/Books.html", label: "Book" },
  { file: "technical.json", page: "/infi_website/HTML/Technical Paper.html", label: "Technical Paper" },
  { file: "fundamental.json", page: "/infi_website/HTML/Fundamental.html", label: "Fundamental Concept" },
  { file: "videos.json", page: "/infi_website/HTML/Videos.html", label: "Video Lecture" },
];

const HTML_PAGE_EXCLUDE = new Set([
  "login.html", "otpVerify.html", "Dashboard.html", "mobile-test.html",
  "responsive-test.html", "redirect.html", "blogwrite.html", "blogwrite_1.html",
  "post1.html", "text.html", "a.html",
]);

const HTML_ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " ",
};

function decodeEntities(str) {
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, (m) => HTML_ENTITIES[m]);
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function pageTitleFromFilename(filename) {
  return filename.replace(/\.html$/i, "").replace(/[-_]/g, " ");
}

const ANCHOR_REGEX = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>[\s\S]*?<\/a\s*>/gi;

function splitChunkByAnchors(chunkHtml) {
  const matches = [...chunkHtml.matchAll(ANCHOR_REGEX)];
  if (matches.length < 2) return null;

  const segments = [];
  let prevEnd = 0;
  for (const m of matches) {
    const end = m.index + m[0].length;
    segments.push({ html: chunkHtml.slice(prevEnd, end), link: m[1] });
    prevEnd = end;
  }
  return segments;
}

function splitLongText(text, maxLen = 800) {
  if (text.length <= maxLen) return [text];
  const words = text.split(" ");
  const parts = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxLen) {
      if (current) parts.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) parts.push(current.trim());
  return parts;
}

function extractBalancedArrayLiteral(content, openBracketIndex) {
  let depth = 0;
  let inString = null;
  for (let i = openBracketIndex; i < content.length; i++) {
    const ch = content[i];
    if (inString) {
      if (ch === "\\") { i++; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inString = ch; continue; }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return content.slice(openBracketIndex, i + 1);
    }
  }
  return null;
}

const JS_DATA_SOURCES = [
  { file: "career.html", varName: "companies", label: "Career/Industry Company", nameKeys: ["name"], textKeys: ["details"], linkKeys: ["link"] },
  { file: "Books.html", varName: "books", label: "Book", nameKeys: ["title"], textKeys: ["author", "desc"], linkKeys: ["link"] },
];

function buildJsEmbeddedDocs() {
  const docs = [];

  for (const source of JS_DATA_SOURCES) {
    let raw;
    try {
      raw = fs.readFileSync(path.join(HTML_DIR, source.file), "utf8");
    } catch (err) {
      continue;
    }

    const marker = `const ${source.varName} = [`;
    const markerIndex = raw.indexOf(marker);
    if (markerIndex === -1) continue;

    const openBracketIndex = markerIndex + marker.length - 1;
    const arrayLiteral = extractBalancedArrayLiteral(raw, openBracketIndex);
    if (!arrayLiteral) continue;

    let items;
    try {
      items = vm.runInNewContext(`(${arrayLiteral})`, {}, { timeout: 1000 });
    } catch (err) {
      logger.warn(`Knowledge base: failed to parse embedded array in ${source.file}: ${err.message}`);
      continue;
    }

    if (!Array.isArray(items)) continue;

    const page = `/infi_website/HTML/${source.file}`;
    for (const item of items) {
      if (!item || typeof item !== "object") continue;

      const title = source.nameKeys.map((k) => item[k]).find(Boolean) || "Untitled";
      const text = source.textKeys.map((k) => item[k]).filter(Boolean).join(" | ");
      const link = source.linkKeys.map((k) => item[k]).find((v) => v && v !== "#") || null;

      docs.push({ source: source.label, title, text, link, page });
    }
  }

  return docs;
}

function buildHtmlPageDocs() {
  const docs = [];
  let files;
  try {
    files = fs.readdirSync(HTML_DIR).filter(
      (f) => f.toLowerCase().endsWith(".html") && !HTML_PAGE_EXCLUDE.has(f)
    );
  } catch (err) {
    logger.error(`Knowledge base: failed to list HTML pages: ${err.message}`);
    return docs;
  }

  for (const filename of files) {
    let raw;
    try {
      raw = fs.readFileSync(path.join(HTML_DIR, filename), "utf8");
    } catch (err) {
      continue;
    }

    raw = raw.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");

    const mainMatch = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    let content = mainMatch ? mainMatch[1] : raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || raw;

    content = content
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "");

    const page = `/infi_website/HTML/${filename}`;
    const headingRegex = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
    const headings = [...content.matchAll(headingRegex)];

    if (!headings.length) {
      const text = stripTags(content);
      if (text.length > 20) {
        for (const part of splitLongText(text)) {
          docs.push({ source: "Site Page", title: pageTitleFromFilename(filename), text: part, link: null, page });
        }
      }
      continue;
    }

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const start = heading.index + heading[0].length;
      const end = i + 1 < headings.length ? headings[i + 1].index : content.length;
      const chunkHtml = content.slice(start, end);

      const title = stripTags(heading[1]) || pageTitleFromFilename(filename);
      const anchorSegments = splitChunkByAnchors(chunkHtml);

      if (anchorSegments) {
        for (const seg of anchorSegments) {
          const segText = stripTags(seg.html);
          if (!segText) continue;
          for (const part of splitLongText(segText)) {
            docs.push({ source: "Site Page", title, text: part, link: seg.link, page });
          }
        }
        continue;
      }

      const linkMatch = chunkHtml.match(/<a[^>]+href="(https?:\/\/[^"]+)"/i);
      const text = stripTags(chunkHtml);

      if (!text && !linkMatch) continue;

      for (const part of splitLongText(text)) {
        docs.push({
          source: "Site Page",
          title,
          text: part,
          link: linkMatch ? linkMatch[1] : null,
          page,
        });
      }
    }
  }

  return docs;
}

const DB_CACHE_TTL_MS = 5 * 60 * 1000;
let dbCache = { docs: [], fetchedAt: 0 };
let staticDocsCache = null;

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    logger.error(`Knowledge base: failed to read ${filePath}: ${err.message}`);
    return {};
  }
}

function flattenEntries(obj) {
  const entries = [];
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const looksLikeGroup = Object.values(value).every(
        (v) => v && typeof v === "object" && !Array.isArray(v)
      );
      if (looksLikeGroup) {
        entries.push(...flattenEntries(value));
        continue;
      }
    }
    entries.push(value);
  }
  return entries;
}

function buildStaticDocs() {
  if (staticDocsCache) return staticDocsCache;

  const docs = [];
  for (const source of STATIC_SOURCES) {
    const data = readJsonSafe(path.join(DATA_DIR, source.file));
    const entries = flattenEntries(data);

    for (const entry of entries) {
      const title = entry.title || entry.name || "Untitled";
      const textParts = [
        entry.author && `Author: ${Array.isArray(entry.author) ? entry.author.join(", ") : entry.author}`,
        entry.Instructor && `Instructor: ${entry.Instructor}`,
        entry.publisher && `Publisher: ${entry.publisher}`,
        entry.year && `Year: ${entry.year}`,
        entry.category && `Category: ${entry.category}`,
        entry.type && `Type: ${entry.type}`,
        entry.keywords && `Keywords: ${Array.isArray(entry.keywords) ? entry.keywords.join(", ") : entry.keywords}`,
        entry.description,
        entry.intro,
        entry.content,
        entry.abstract,
      ].filter(Boolean);

      docs.push({
        source: source.label,
        title,
        text: textParts.join(" | "),
        link: entry.link || null,
        page: source.page,
      });
    }
  }

  docs.push(...buildHtmlPageDocs());
  docs.push(...buildJsEmbeddedDocs());

  staticDocsCache = docs;
  return docs;
}

async function fetchDbDocs() {
  const now = Date.now();
  if (now - dbCache.fetchedAt < DB_CACHE_TTL_MS && dbCache.docs.length) {
    return dbCache.docs;
  }

  const docs = [];

  try {
    const { rows: posts } = await query(
      `SELECT Title, User_Name, Created_At FROM Post WHERE Status = 'published' ORDER BY Created_At DESC LIMIT 30;`
    );
    for (const post of posts) {
      docs.push({
        source: "Blog Post",
        title: post.title,
        text: `Author: ${post.user_name || "Unknown"}`,
        link: null,
        page: "/blog.html",
      });
    }
  } catch (err) {
    logger.warn(`Knowledge base: could not load posts: ${err.message}`);
  }

  try {
    const { rows: resources } = await query(
      `SELECT Auth_Name, Title, Contain_Link, Contain_Type, Description, Resource_Keyword FROM "Resource" ORDER BY Date_of_Upload DESC LIMIT 50;`
    );
    for (const r of resources) {
      docs.push({
        source: `Resource (${r.contain_type || "misc"})`,
        title: r.title,
        text: [
          r.auth_name && `Author: ${r.auth_name}`,
          r.resource_keyword && `Keywords: ${r.resource_keyword}`,
          r.description,
        ]
          .filter(Boolean)
          .join(" | "),
        link: r.contain_link || null,
        page: null,
      });
    }
  } catch (err) {
    logger.warn(`Knowledge base: could not load resources: ${err.message}`);
  }

  dbCache = { docs, fetchedAt: now };
  return docs;
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "of", "to", "for", "in", "on",
  "and", "or", "what", "where", "when", "how", "does", "do", "can", "you",
  "me", "please", "about", "link", "links", "give", "provide", "tell", "with",
]);

function stem(token) {
  if (token.length > 4 && token.endsWith("ies")) return token.slice(0, -3) + "y";
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s") && !token.endsWith("ss")) return token.slice(0, -1);
  return token;
}

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
    .map(stem);
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

let vocabCache = null;

function buildVocab(docs) {
  const vocab = new Set();
  for (const doc of docs) {
    for (const t of tokenize(`${doc.title} ${doc.source} ${doc.text}`)) vocab.add(t);
  }
  return vocab;
}

function fuzzyCorrect(token, vocab) {
  if (vocab.has(token)) return token;
  if (token.length < 5) return token;

  const maxDist = token.length <= 6 ? 1 : 2;
  let best = null;
  let bestDist = Infinity;
  for (const word of vocab) {
    if (Math.abs(word.length - token.length) > maxDist) continue;
    const dist = levenshtein(token, word);
    if (dist < bestDist) {
      bestDist = dist;
      best = word;
    }
  }
  return bestDist <= maxDist ? best : token;
}

function computeDocTokens(doc) {
  return {
    title: tokenize(doc.title),
    source: tokenize(doc.source),
    body: tokenize(doc.text),
  };
}

function buildDocFrequency(docTokensList) {
  const df = new Map();
  for (const t of docTokensList) {
    const unique = new Set([...t.title, ...t.source, ...t.body]);
    for (const tok of unique) df.set(tok, (df.get(tok) || 0) + 1);
  }
  return df;
}

function idf(token, df, totalDocs) {
  return Math.log((totalDocs + 1) / ((df.get(token) || 0) + 1)) + 1;
}

function selectDiverse(scored, limit, perPageCap = 3) {
  const result = [];
  const counts = new Map();
  for (const { doc } of scored) {
    const key = doc.page || doc.link || doc.title;
    const count = counts.get(key) || 0;
    if (count >= perPageCap) continue;
    counts.set(key, count + 1);
    result.push(doc);
    if (result.length >= limit) break;
  }
  return result;
}

async function search(userMessage, limit = 14) {
  const [staticDocs, dbDocs] = [buildStaticDocs(), await fetchDbDocs()];
  const allDocs = [...dbDocs, ...staticDocs];

  if (!vocabCache) vocabCache = buildVocab(staticDocs);

  const rawTokens = tokenize(userMessage);
  if (!rawTokens.length) return [];

  const queryTokens = [...new Set(rawTokens.map((t) => fuzzyCorrect(t, vocabCache)))];

  const docTokensList = allDocs.map(computeDocTokens);
  const df = buildDocFrequency(docTokensList);
  const totalDocs = allDocs.length;

  const scored = allDocs
    .map((doc, i) => {
      const dt = docTokensList[i];
      const titleSet = new Set(dt.title);
      const sourceSet = new Set(dt.source);
      const bodySet = new Set(dt.body);
      let score = 0;
      for (const token of queryTokens) {
        const weight = idf(token, df, totalDocs);
        if (titleSet.has(token)) score += 3 * weight;
        if (sourceSet.has(token)) score += 2 * weight;
        if (bodySet.has(token)) score += 1 * weight;
      }
      return { doc, score };
    })
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score);

  return selectDiverse(scored, limit);
}

module.exports = { search };
