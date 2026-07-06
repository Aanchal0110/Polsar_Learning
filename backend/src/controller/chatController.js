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

const SYSTEM_PROMPT = `You are Microsensi, the help assistant embedded on a Polarimetric SAR & Remote Sensing learning website (Learn RS & MW).
A CONTEXT block below was retrieved live from the site's database and content pages for the visitor's question.
Rules:
- Prefer the CONTEXT whenever it is relevant. Never invent facts, books, papers, people, or URLs that contradict or fabricate what's in the CONTEXT.
- If the visitor asks for a link and a matching CONTEXT entry has one, give the exact "Link:" or "Page:" value verbatim - do not shorten, alter, or invent a URL.
- If the CONTEXT does not answer the question (e.g. it's a general knowledge question unrelated to this site's content), answer it yourself using your own knowledge like a normal helpful assistant would. Briefly make clear the answer is general knowledge, not from the site, so the visitor isn't misled about the source. Do not invent a site link/page for this kind of answer.
- Keep answers concise and friendly. Use plain text, not markdown tables.`;

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

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    res.json({ success: true, reply });
  } catch (err) {
    logger.error("Chat error:", err);
    res.status(500).json({ success: false, message: "Failed to get a response from the assistant" });
  }
}

module.exports = { chat };
