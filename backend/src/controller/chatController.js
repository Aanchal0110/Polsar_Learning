const Anthropic = require("@anthropic-ai/sdk");
const logger = require("../services/logger");
const knowledgeBase = require("../services/knowledgeBase");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-5";
const MAX_HISTORY_TURNS = 6;

function buildContextBlock(docs) {
  if (!docs.length) return "No matching information was found on the website for this question.";

  return docs
    .map((doc, i) => {
      const linkLine = doc.link
        ? `Link: ${doc.link}`
        : doc.page
        ? `Page: ${doc.page}`
        : "Link: none available";
      return `[${i + 1}] Source: ${doc.source}\nTitle: ${doc.title}\n${doc.text}\n${linkLine}`;
    })
    .join("\n\n");
}

// Shown (as a separate, muted line in the widget) under answers that come from
// the AI's own general knowledge rather than the site's knowledge base, so
// visitors aren't misled about the source.
const AI_DISCLAIMER =
  "This answer is AI-generated from general knowledge, not from this site's own content, so please double-check it before relying on it.";

const SYSTEM_PROMPT = `You are Microsensi, the help assistant embedded on a Polarimetric SAR & Remote Sensing learning website (Learn RS & MW).
A CONTEXT block below was retrieved live from the site's database and content pages for the visitor's question.

Answer in TWO steps:
1. FIRST decide whether the CONTEXT (the site's own knowledge base) actually answers the visitor's question.
   - If it does, answer using the CONTEXT. Never invent facts, books, papers, people, or URLs that contradict or fabricate what's in the CONTEXT. If the visitor asks for a link and a matching CONTEXT entry has one, give the exact "Link:" or "Page:" value verbatim - do not shorten, alter, or invent a URL. This is a "kb" answer.
   - If the CONTEXT does NOT answer the question (e.g. a general knowledge question unrelated to this site's content), answer it yourself using your own general knowledge, phrased clearly and helpfully. Do not invent a site link/page for this kind of answer. This is an "ai" answer.
2. Keep answers concise and friendly. Use plain text, not markdown tables.

Respond with a single JSON object and nothing else, in this exact shape:
{"source": "kb" | "ai", "answer": "<your answer as plain text>"}
Use "kb" only when the answer genuinely came from the CONTEXT; otherwise use "ai".`;

// Pull a {"source","answer"} object out of the model's reply. Tolerates code
// fences or stray prose around the JSON. Falls back to treating the whole reply
// as an unclassified answer so a formatting slip never breaks the chat.
function parseModelReply(rawText) {
  const text = rawText.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      const parsed = JSON.parse(text.slice(start, end + 1));
      if (parsed && typeof parsed.answer === "string" && parsed.answer.trim()) {
        return {
          source: parsed.source === "kb" ? "kb" : "ai",
          answer: parsed.answer.trim(),
        };
      }
    } catch (err) {
      // fall through to the plain-text fallback below
    }
  }
  return { source: "ai", answer: text };
}

async function chat(req, res) {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, message: "message is required" });
    }

    const docs = await knowledgeBase.search(message);
    const contextBlock = buildContextBlock(docs);

    const safeHistory = Array.isArray(history)
      ? history
          .filter((h) => h && (h.role === "user" || h.role === "assistant") && typeof h.content === "string")
          .slice(-MAX_HISTORY_TURNS * 2)
      : [];

    const messages = [
      ...safeHistory.map((h) => ({ role: h.role, content: h.content })),
      {
        role: "user",
        content: `CONTEXT:\n${contextBlock}\n\nVISITOR QUESTION: ${message}`,
      },
    ];

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const rawText = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    const { source, answer } = parseModelReply(rawText);

    res.json({
      success: true,
      reply: answer,
      source,
      disclaimer: source === "ai" ? AI_DISCLAIMER : null,
    });
  } catch (err) {
    logger.error("Chat error:", err);
    res.status(500).json({ success: false, message: "Failed to get a response from the assistant" });
  }
}

module.exports = { chat };
