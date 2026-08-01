/* LoFiWeb Tutorial IDE — editors, live VormWeb preview + console, lessons rail, tutor modal. */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var LOFI = window.LOFI;

  var editors = {
    html: { ta: $("ed-html"), gutter: $("gutter-html") },
    js:   { ta: $("ed-js"),   gutter: $("gutter-js") },
    css:  { ta: $("ed-css"),  gutter: $("gutter-css") }
  };

  var STARTER = {
    html: "<h1>Welcome to LoFiWeb Tutorial</h1>\n<p>Open the Lessons panel on the right and begin Course 1.</p>",
    js:   "",
    css:  "body {\n  font-family: Georgia, serif;\n  text-align: center;\n  padding: 3rem 2rem;\n  background: #f6f0e2;\n  color: #2b2219;\n}"
  };

  /* ------------------------------------------------- editors + gutter -- */
  /* Hidden mirror used to measure how many visual rows each wrapped
     logical line occupies, so gutter numbers stay aligned. */
  var measurer = document.createElement("div");
  measurer.style.cssText = "position:absolute;visibility:hidden;left:-9999px;top:0;" +
    "white-space:pre-wrap;overflow-wrap:break-word;";
  document.body.appendChild(measurer);

  function updateGutter(ed) {
    var cs = getComputedStyle(ed.ta);
    measurer.style.fontFamily = cs.fontFamily;
    measurer.style.fontSize = cs.fontSize;
    measurer.style.lineHeight = cs.lineHeight;
    measurer.style.tabSize = cs.tabSize;
    var pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    measurer.style.width = Math.max(ed.ta.clientWidth - pad, 10) + "px";
    var lineH = parseFloat(cs.lineHeight);
    var lines = ed.ta.value.split("\n");
    var s = "";
    for (var i = 0; i < lines.length; i++) {
      measurer.textContent = lines[i] || " ";
      var rows = Math.max(1, Math.round(measurer.offsetHeight / lineH));
      s += (i + 1) + "\n";
      for (var r = 1; r < rows; r++) s += "\n";
    }
    ed.gutter.textContent = s;
    ed.gutter.scrollTop = ed.ta.scrollTop;
  }

  var gutterRaf = null;
  function refreshGutters() {
    if (gutterRaf) return;
    gutterRaf = requestAnimationFrame(function () {
      gutterRaf = null;
      ["html", "js", "css"].forEach(function (k) { updateGutter(editors[k]); });
    });
  }

  function wireEditor(key) {
    var ed = editors[key];
    ed.ta.addEventListener("input", function () { updateGutter(ed); schedulePreview(); });
    ed.ta.addEventListener("scroll", function () { ed.gutter.scrollTop = ed.ta.scrollTop; });
    ed.ta.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var s = ed.ta.selectionStart, en = ed.ta.selectionEnd;
        ed.ta.value = ed.ta.value.slice(0, s) + "  " + ed.ta.value.slice(en);
        ed.ta.selectionStart = ed.ta.selectionEnd = s + 2;
        updateGutter(ed); schedulePreview();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); playScanline(); flashRunButton(); renderPreview(); }
    });
  }

  function setEditors(vals) {
    if (vals.html != null) editors.html.ta.value = vals.html;
    if (vals.js != null) editors.js.ta.value = vals.js;
    if (vals.css != null) editors.css.ta.value = vals.css;
    ["html", "js", "css"].forEach(function (k) {
      updateGutter(editors[k]);
      window.TUT.syncTextarea(editors[k].ta);   // programmatic set, not a paste
    });
    renderPreview();
  }

  /* --------------------------------------------------- live preview --- */
  /* Bridge injected into the preview <head>: forwards console messages and
     uncaught errors to the parent page, where they appear in the Console
     panel. Sandboxed frames can still postMessage to their parent. */
  /* __OFF__ is replaced with the number of document lines that precede the
     user's JS, so error line numbers match the JS editor's gutter. */
  var CONSOLE_BRIDGE = "<scr" + "ipt>\n(function () {\n" +
    "  var OFF = __OFF__;\n" +
    "  function send(level, args) {\n" +
    "    var text = Array.prototype.map.call(args, function (a) {\n" +
    "      if (a && typeof a === \"object\") { try { return JSON.stringify(a); } catch (e) { return String(a); } }\n" +
    "      return String(a);\n" +
    "    }).join(\" \");\n" +
    "    parent.postMessage({ lofiConsole: true, level: level, text: text }, \"*\");\n" +
    "  }\n" +
    "  [\"log\", \"info\", \"warn\", \"error\"].forEach(function (level) {\n" +
    "    var orig = console[level];\n" +
    "    console[level] = function () { send(level, arguments); orig.apply(console, arguments); };\n" +
    "  });\n" +
    "  window.addEventListener(\"error\", function (e) {\n" +
    "    var where = \"\";\n" +
    "    if (e.lineno) where = (e.lineno > OFF) ? \" (JS line \" + (e.lineno - OFF) + \")\" : \" (line \" + e.lineno + \")\";\n" +
    "    send(\"error\", [e.message + where]);\n" +
    "  });\n" +
    "})();\n</scr" + "ipt>\n";

  function appendLog(level, text) {
    var body = $("consoleBody");
    var entry = document.createElement("div");
    entry.className = "entry" + (level === "warn" || level === "error" ? " " + level : "");
    entry.textContent = text;
    body.appendChild(entry);
    body.scrollTop = body.scrollHeight;
  }
  function clearConsole() { $("consoleBody").innerHTML = ""; }

  var previewTimer = null;
  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(renderPreview, 500);
  }
  function playScanline() {
    var el = $("vwScanline");
    el.classList.remove("scanning");
    void el.offsetWidth; // force reflow so re-adding the class restarts the animation
    el.classList.add("scanning");
  }

  function flashRunButton() {
    var el = $("runBtn");
    el.classList.remove("run-flash");
    void el.offsetWidth;
    el.classList.add("run-flash");
    clearTimeout(el._flashTimer);
    el._flashTimer = setTimeout(function () { el.classList.remove("run-flash"); }, 700);
  }

  function renderPreview() {
    clearTimeout(previewTimer);
    clearConsole();
    if (window.TUT && activeLesson) window.TUT.bumpRuns(activeLesson.id, false);
    var html = editors.html.ta.value, js = editors.js.ta.value, css = editors.css.ta.value;
    // Count the lines before the user's JS (a marker stands in for it;
    // swapping "0" for the real number doesn't change the line count).
    var probe = LOFI.buildDocument(html, "\x00JS\x00", css, CONSOLE_BRIDGE.replace("__OFF__", "0"));
    var off = probe.slice(0, probe.indexOf("\x00JS\x00")).split("\n").length - 1;
    $("preview").srcdoc = LOFI.buildDocument(html, js, css, CONSOLE_BRIDGE.replace("__OFF__", String(off)));
  }

  /* ---------------------------------------------------- single file --- */
  function currentDocument() {
    return LOFI.buildDocument(editors.html.ta.value, editors.js.ta.value, editors.css.ta.value);
  }

  function saveFile() {
    var blob = new Blob([currentDocument()], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "my-webpage.html";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast("Saved my-webpage.html");
  }

  function copyFile() {
    var text = currentDocument();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Copied the whole page!"); },
        function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    var t = document.createElement("textarea");
    t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); toast("Copied the whole page!"); }
    catch (e) { toast("Copy failed — select & copy manually"); }
    t.remove();
  }

  function loadFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var doc = new DOMParser().parseFromString(reader.result, "text/html");
        var css = Array.prototype.map.call(doc.querySelectorAll("style"), function (s) { return s.textContent; }).join("\n").trim();
        var js = Array.prototype.map.call(doc.querySelectorAll("script"), function (s) { return s.textContent; }).join("\n").trim();
        var body = doc.body ? doc.body.cloneNode(true) : document.createElement("body");
        Array.prototype.forEach.call(body.querySelectorAll("script,style"), function (n) { n.remove(); });
        setEditors({ html: body.innerHTML.trim(), js: js, css: css });
        toast("Loaded " + file.name);
      } catch (e) { toast("Could not read that file"); }
    };
    reader.readAsText(file);
  }

  /* ----------------------------------------------- placeholder modal -- */
  function buildPlaceholderGrid() {
    var grid = $("phGrid");
    grid.innerHTML = "";
    (window.PLACEHOLDERS || []).forEach(function (p) {
      var item = document.createElement("button");
      item.className = "ph-item"; item.type = "button";
      item.innerHTML = '<img src="' + p.uri + '" alt=""><span>' + LOFI.esc(p.name) + "</span>";
      item.addEventListener("click", function () {
        insertPlaceholder(p);
        closeModal();
      });
      grid.appendChild(item);
    });
  }
  function insertPlaceholder(p) {
    var tag = '<img src="' + p.uri + '" alt="placeholder" width="' + p.w + '" height="' + p.h + '">\n';
    var ta = editors.html.ta;
    var s = ta.selectionStart, e = ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + tag + ta.value.slice(e);
    ta.selectionStart = ta.selectionEnd = s + tag.length;
    updateGutter(editors.html); renderPreview();
    toast("Inserted " + p.name);
  }
  function openModal() { $("phModal").hidden = false; }
  function closeModal() { $("phModal").hidden = true; }

  /* --------------------------------------------------- divider drag --- */
  var ws = $("workspace"), divider = $("divider");
  function applySplit(ratio) {
    ratio = Math.max(0.15, Math.min(0.85, ratio));
    ws.style.gridTemplateColumns = ratio + "fr 7px " + (1 - ratio) + "fr";
    refreshGutters(); // wrap points move with the column width
  }
  function initSplit() {
    var saved = parseFloat(localStorage.getItem("lofi:split"));
    applySplit(isNaN(saved) ? 0.5 : saved);
  }
  divider.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    divider.classList.add("dragging");
    divider.setPointerCapture(e.pointerId);
    function move(ev) {
      var rect = ws.getBoundingClientRect();
      var ratio = (ev.clientX - rect.left) / rect.width;
      applySplit(ratio);
    }
    function up(ev) {
      divider.classList.remove("dragging");
      var rect = ws.getBoundingClientRect();
      var ratio = Math.max(0.15, Math.min(0.85, (ev.clientX - rect.left) / rect.width));
      localStorage.setItem("lofi:split", ratio.toFixed(3));
      divider.removeEventListener("pointermove", move);
      divider.removeEventListener("pointerup", up);
    }
    divider.addEventListener("pointermove", move);
    divider.addEventListener("pointerup", up);
  });
  divider.addEventListener("dblclick", function () { applySplit(0.5); localStorage.setItem("lofi:split", "0.5"); });

  /* ------------------------------------------------ row divider drag --- */
  var editorsCol = $("editors");
  var rowEls = editorsCol.querySelectorAll(".editor-row");
  var rowDividers = editorsCol.querySelectorAll(".row-divider");
  var rowFr = [1, 1, 1];
  function applyRows() {
    for (var i = 0; i < rowEls.length; i++) rowEls[i].style.flexGrow = rowFr[i];
  }
  function initRows() {
    try {
      var saved = JSON.parse(localStorage.getItem("lofi:rows"));
      if (saved && saved.length === rowEls.length) rowFr = saved;
    } catch (e) {}
    applyRows();
  }
  Array.prototype.forEach.call(rowDividers, function (div, i) {
    div.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      div.classList.add("dragging");
      div.setPointerCapture(e.pointerId);
      var startY = e.clientY, start = rowFr.slice();
      var total = start.reduce(function (a, b) { return a + b; }, 0);
      var pair = start[i] + start[i + 1];
      var min = Math.min(0.12 * total, pair / 2);
      function move(ev) {
        var h = editorsCol.getBoundingClientRect().height;
        var d = (ev.clientY - startY) / h * total;
        var a = Math.max(min, Math.min(pair - min, start[i] + d));
        rowFr[i] = a; rowFr[i + 1] = pair - a;
        applyRows();
      }
      function up() {
        div.classList.remove("dragging");
        localStorage.setItem("lofi:rows", JSON.stringify(rowFr.map(function (v) { return +v.toFixed(3); })));
        div.removeEventListener("pointermove", move);
        div.removeEventListener("pointerup", up);
      }
      div.addEventListener("pointermove", move);
      div.addEventListener("pointerup", up);
    });
    div.addEventListener("dblclick", function () {
      rowFr = [1, 1, 1]; applyRows();
      localStorage.setItem("lofi:rows", JSON.stringify(rowFr));
    });
  });

  window.addEventListener("resize", refreshGutters);

  /* --------------------------------------------- lessons rail + tutor --- */
  var TUT = window.TUT;
  var activeLesson = null;   // the lesson the student is working on
  var lmPageIdx = 0;

  function lessonStatus(id) {
    var r = TUT.load()[id];
    if (!r) return "";
    return r.status === "complete" ? "complete" : "started";
  }

  function renderRail() {
    var nav = $("lessonNav");
    nav.innerHTML = "";
    var done = 0, total = 0;
    window.COURSES.forEach(function (course, ci) {
      var det = document.createElement("details");
      det.className = "lesson-group";
      if (ci === 0) det.open = true;
      var sum = document.createElement("summary");
      sum.innerHTML = LOFI.esc(course.title) +
        "<span class='group-sub'>" + LOFI.esc(course.sub) + "</span>";
      det.appendChild(sum);
      var links = document.createElement("div");
      links.className = "lesson-links";
      course.lessons.forEach(function (les, li) {
        total++;
        var st = lessonStatus(les.id);
        if (st === "complete") done++;
        var a = document.createElement("a");
        a.className = "lesson-link";
        a.innerHTML = "<span class='code'>" + (li + 1) + "</span>" +
          "<span>" + LOFI.esc(les.title) + "</span>" +
          "<span class='status " + st + "'>" +
          (st === "complete" ? "done" : st === "started" ? "begun" : "") + "</span>";
        a.addEventListener("click", function (e) { e.preventDefault(); openLesson(les); });
        links.appendChild(a);
      });
      det.appendChild(links);
      nav.appendChild(det);
    });
    $("railProgress").textContent = done + " of " + total + " lessons complete";
  }

  function openLesson(les) {
    activeLesson = les;
    TUT.record(les.id);
    lmPageIdx = 0;
    $("lessonModal").hidden = false;
    $("lmTitle").textContent = les.title;
    $("lmGoal").textContent = "Goal: " + les.goal;
    renderLessonPage();
    $("rail").classList.remove("open");
    renderRail();
  }
  function closeLesson() { $("lessonModal").hidden = true; }

  function currentCode() {
    return { html: editors.html.ta.value, css: editors.css.ta.value, js: editors.js.ta.value };
  }

  function renderLessonPage() {
    var les = activeLesson;
    var totalPages = les.pages.length + 1;   // theory pages + the task page
    var onTask = lmPageIdx >= les.pages.length;
    $("lmCount").textContent = (lmPageIdx + 1) + " / " + totalPages;
    $("lmBack").disabled = lmPageIdx === 0;
    $("lmNext").disabled = lmPageIdx >= totalPages - 1;
    $("lmLoad").hidden = !les.sample;
    $("lmCheckBtn").hidden = !onTask;
    $("lmChecks").hidden = !onTask;
    $("lmNote").hidden = true;
    if (onTask) {
      $("lmPage").innerHTML = "<h3>Your task</h3>" + LOFI.renderMarkdown(les.task);
      renderChecks(false);   // show where they stand, but never auto-complete
    } else {
      $("lmPage").innerHTML = LOFI.renderMarkdown(les.pages[lmPageIdx]);
    }
    $("lmPage").scrollTop = 0;
  }

  function renderChecks(commit) {
    var les = activeLesson;
    var results = TUT.runChecks(les.checks, currentCode(), les.sample);
    var ul = $("lmCheckList");
    ul.innerHTML = "";
    results.forEach(function (r) {
      var li = document.createElement("li");
      li.className = r.pass ? "pass" : "fail";
      li.textContent = r.label;
      ul.appendChild(li);
    });
    if (TUT.allPass(results) && commit) {
      var rec = TUT.markComplete(les.id, currentCode(), les.sample);
      launchConfetti();
      var note = "Lesson complete - well done.";
      if (rec.flags && rec.flags.length) {
        note += " A note about how this code was produced has been recorded for your teacher.";
      }
      $("lmNote").textContent = note;
      $("lmNote").hidden = false;
      renderRail();
    }
  }

  function wireLessons() {
    $("lmClose").addEventListener("click", closeLesson);
    $("lessonModal").addEventListener("click", function (e) {
      if (e.target === $("lessonModal")) closeLesson();
    });
    $("lmBack").addEventListener("click", function () {
      if (lmPageIdx > 0) { lmPageIdx--; renderLessonPage(); }
    });
    $("lmNext").addEventListener("click", function () {
      if (lmPageIdx < activeLesson.pages.length) { lmPageIdx++; renderLessonPage(); }
    });
    $("lmLoad").addEventListener("click", function () {
      if (activeLesson && activeLesson.sample) {
        setEditors({
          html: activeLesson.sample.html || "",
          css: activeLesson.sample.css || "",
          js: activeLesson.sample.js || ""
        });
        toast("Example loaded - now make it your own");
      }
    });
    $("lmCheckBtn").addEventListener("click", function () { renderChecks(true); });
  }

  /* -------------------------------------------------------- toast ----- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("toast"); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 1800);
  }

  /* ----------------------------------------------------- confetti ----- */
  var CONFETTI_COLORS = ["#ff4fd8", "#00e5ff", "#8a5cff", "#6bffb0", "#ff8fe8"];
  function launchConfetti() {
    var count = 50;
    for (var i = 0; i < count; i++) {
      var piece = document.createElement("div");
      piece.className = "confetti-piece";
      var left = Math.random() * 100;
      var duration = 1.6 + Math.random() * 1.2;
      var delay = Math.random() * 0.35;
      var spin = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 720);
      piece.style.left = left + "vw";
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDuration = duration + "s";
      piece.style.animationDelay = delay + "s";
      piece.style.setProperty("--spin", spin + "deg");
      document.body.appendChild(piece);
      (function (el, ms) {
        setTimeout(function () { el.remove(); }, ms);
      })(piece, (duration + delay) * 1000 + 100);
    }
  }

  /* -------------------------------------------------------- wire up --- */
  function wire() {
    ["html", "js", "css"].forEach(wireEditor);
    $("runBtn").addEventListener("click", function () { playScanline(); flashRunButton(); renderPreview(); });
    $("reloadBtn").addEventListener("click", function () { playScanline(); renderPreview(); });
    $("saveBtn").addEventListener("click", saveFile);
    $("copyBtn").addEventListener("click", copyFile);
    $("loadBtn").addEventListener("click", function () { $("fileInput").click(); });
    $("fileInput").addEventListener("change", function (e) {
      if (e.target.files && e.target.files[0]) loadFile(e.target.files[0]);
      e.target.value = "";
    });
    $("placeholderBtn").addEventListener("click", openModal);
    $("phClose").addEventListener("click", closeModal);
    $("phModal").addEventListener("click", function (e) { if (e.target === $("phModal")) closeModal(); });
    $("railToggle").addEventListener("click", function () { $("rail").classList.add("open"); });
    $("railClose").addEventListener("click", function () { $("rail").classList.remove("open"); });
    $("consoleClear").addEventListener("click", clearConsole);
    window.addEventListener("message", function (e) {
      var d = e.data;
      if (d && d.lofiConsole) appendLog(d.level, d.text);
    });
    wireLessons();
  }

  function boot() {
    wire();
    initSplit();
    initRows();
    buildPlaceholderGrid();
    renderRail();
    TUT.attachTelemetry(
      { html: editors.html.ta, css: editors.css.ta, js: editors.js.ta },
      function () { return activeLesson ? activeLesson.id : null; },
      false
    );
    setEditors(STARTER);
  }

  boot();
})();
