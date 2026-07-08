(function () {
  var STYLE = [
    "#lrsw-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;",
    "background:#0077b5;color:#fff;border:none;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer;",
    "font-size:26px;z-index:99999;display:flex;align-items:center;justify-content:center;}",
    "#lrsw-bubble:hover{background:#005885;}",
    "#lrsw-panel{position:fixed;bottom:90px;right:24px;width:340px;max-width:92vw;height:460px;",
    "max-height:75vh;background:#fff;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.3);",
    "display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:Arial,sans-serif;}",
    "#lrsw-panel.lrsw-open{display:flex;}",
    "#lrsw-header{background:#0077b5;color:#fff;padding:12px 14px;font-weight:bold;display:flex;",
    "justify-content:space-between;align-items:center;}",
    "#lrsw-close{background:none;border:none;color:#fff;font-size:18px;cursor:pointer;line-height:1;}",
    "#lrsw-messages{flex:1;overflow-y:auto;padding:12px;background:#f5f7fa;}",
    ".lrsw-msg{margin-bottom:10px;max-width:85%;padding:8px 12px;border-radius:10px;font-size:14px;",
    "line-height:1.4;white-space:pre-wrap;word-wrap:break-word;}",
    ".lrsw-msg a{color:#0077b5;text-decoration:underline;}",
    ".lrsw-user{background:#0077b5;color:#fff;margin-left:auto;border-bottom-right-radius:2px;}",
    ".lrsw-bot{background:#e9edf1;color:#222;margin-right:auto;border-bottom-left-radius:2px;}",
    "#lrsw-inputbar{display:flex;border-top:1px solid #ddd;padding:8px;background:#fff;}",
    "#lrsw-input{flex:1;border:1px solid #ccc;border-radius:20px;padding:8px 12px;font-size:14px;outline:none;}",
    "#lrsw-send{margin-left:8px;background:#0077b5;color:#fff;border:none;border-radius:20px;",
    "padding:8px 16px;cursor:pointer;font-size:14px;}",
    "#lrsw-send:disabled{opacity:.6;cursor:default;}",
    ".lrsw-typing{font-style:italic;color:#666;}",
    ".lrsw-disclaimer{margin:-4px auto 10px 0;max-width:85%;padding:6px 10px;border-radius:8px;",
    "background:#fff7e6;border:1px solid #ffe0a3;color:#8a6d3b;font-size:11.5px;line-height:1.35;",
    "display:flex;gap:6px;align-items:flex-start;}",
    ".lrsw-disclaimer .lrsw-disc-icon{flex:none;}",
  ].join("");

  function injectStyle() {
    var tag = document.createElement("style");
    tag.textContent = STYLE;
    document.head.appendChild(tag);
  }

  function linkify(text) {
    var escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return escaped.replace(/(https?:\/\/[^\s]+)/g, function (url) {
      var clean = url.replace(/[.,)]+$/, "");
      return '<a href="' + clean + '" target="_blank" rel="noopener">' + clean + "</a>";
    });
  }

  function build() {
    injectStyle();

    var bubble = document.createElement("button");
    bubble.id = "lrsw-bubble";
    bubble.setAttribute("aria-label", "Open chat assistant");
    bubble.innerHTML = "💬";

    var panel = document.createElement("div");
    panel.id = "lrsw-panel";
    panel.innerHTML =
      '<div id="lrsw-header"><span>Microsensi</span>' +
      '<button id="lrsw-close" aria-label="Close chat">✕</button></div>' +
      '<div id="lrsw-messages"></div>' +
      '<div id="lrsw-inputbar">' +
      '<input id="lrsw-input" type="text" placeholder="Ask about books, papers, videos..." />' +
      '<button id="lrsw-send">Send</button>' +
      "</div>";

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    var messagesEl = panel.querySelector("#lrsw-messages");
    var inputEl = panel.querySelector("#lrsw-input");
    var sendBtn = panel.querySelector("#lrsw-send");
    var closeBtn = panel.querySelector("#lrsw-close");

    var history = [];
    var greeted = false;

    function addMessage(role, text) {
      var div = document.createElement("div");
      div.className = "lrsw-msg " + (role === "user" ? "lrsw-user" : "lrsw-bot");
      div.innerHTML = linkify(text);
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    function addDisclaimer(text) {
      var div = document.createElement("div");
      div.className = "lrsw-disclaimer";
      div.innerHTML =
        '<span class="lrsw-disc-icon" aria-hidden="true">⚠️</span><span>' +
        linkify(text) +
        "</span>";
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    function togglePanel(open) {
      panel.classList.toggle("lrsw-open", open);
      if (open && !greeted) {
        greeted = true;
        addMessage(
          "assistant",
          "Hi! I'm Microsensi. I can answer questions about the books, technical papers, fundamentals, videos, and blog posts on this site. What would you like to know?"
        );
      }
      if (open) inputEl.focus();
    }

    bubble.addEventListener("click", function () {
      togglePanel(!panel.classList.contains("lrsw-open"));
    });
    closeBtn.addEventListener("click", function () {
      togglePanel(false);
    });

    async function send() {
      var text = inputEl.value.trim();
      if (!text) return;

      addMessage("user", text);
      history.push({ role: "user", content: text });
      inputEl.value = "";
      sendBtn.disabled = true;

      var typingEl = addMessage("assistant", "Typing...");
      typingEl.classList.add("lrsw-typing");

      try {
        var res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: history }),
        });
        var data = await res.json();

        typingEl.remove();

        if (data.success) {
          addMessage("assistant", data.reply);
          if (data.disclaimer) addDisclaimer(data.disclaimer);
          history.push({ role: "assistant", content: data.reply });
        } else {
          addMessage("assistant", "Sorry, I couldn't get an answer right now.");
        }
      } catch (err) {
        typingEl.remove();
        addMessage("assistant", "Sorry, something went wrong reaching the assistant.");
      } finally {
        sendBtn.disabled = false;
      }
    }

    sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter") send();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
