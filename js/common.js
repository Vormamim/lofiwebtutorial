/* Shared helpers used by the IDE and the tutorials page. */
window.LOFI = (function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function inline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, function (_, c) { return "<code>" + c + "</code>"; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return s;
  }

  // Small Markdown-lite: blank-line paragraphs, - bullets, 1. lists,
  // ```fenced code```, **bold**, *italic*, `code`.
  function renderMarkdown(src) {
    if (!src) return "";
    var lines = src.replace(/\r/g, "").split("\n");
    var out = [], i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (/^```/.test(line.trim())) {
        i++;
        var code = [];
        while (i < lines.length && !/^```/.test(lines[i].trim())) { code.push(lines[i]); i++; }
        i++;
        out.push("<pre><code>" + esc(code.join("\n")) + "</code></pre>");
        continue;
      }
      if (/^\s*-\s+/.test(line)) {
        var ul = ["<ul>"];
        while (i < lines.length && /^\s*-\s+/.test(lines[i])) { ul.push("<li>" + inline(lines[i].replace(/^\s*-\s+/, "")) + "</li>"); i++; }
        ul.push("</ul>"); out.push(ul.join("")); continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        var ol = ["<ol>"];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { ol.push("<li>" + inline(lines[i].replace(/^\s*\d+\.\s+/, "")) + "</li>"); i++; }
        ol.push("</ol>"); out.push(ol.join("")); continue;
      }
      var para = [];
      while (i < lines.length && lines[i].trim() && !/^\s*-\s+/.test(lines[i]) &&
             !/^\s*\d+\.\s+/.test(lines[i]) && !/^```/.test(lines[i].trim())) { para.push(lines[i]); i++; }
      out.push("<p>" + inline(para.join(" ")) + "</p>");
    }
    return out.join("\n");
  }

  // Assemble the three editors into one self-contained HTML document.
  // `inject` (optional) is extra head markup used only by the live preview
  // (e.g. the console bridge) — never included in saved/copied files.
  function buildDocument(html, js, css, inject) {
    return "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n" + (inject || "") +
      "<style>\n" + (css || "") + "\n</style>\n</head>\n<body>\n" +
      (html || "") + "\n<scr" + "ipt>\n" + (js || "") + "\n</scr" + "ipt>\n</body>\n</html>";
  }

  return { esc: esc, inline: inline, renderMarkdown: renderMarkdown, buildDocument: buildDocument };
})();
