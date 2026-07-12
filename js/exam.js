/* LoFiWeb Tutorial — the practical examination page.
   Eight independent questions, a 50-minute countdown, per-question self-checks,
   and downloads that embed a provenance record (typed/pasted/time) so the
   marker can see how the code was produced. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var LOFI = window.LOFI, TUT = window.TUT;
  var EXAM = window.EXAM;

  var tas = { html: $("ed-html"), css: $("ed-css"), js: $("ed-js") };
  var qIdx = 0;
  var started = false;
  var timeLeft = EXAM.minutes * 60;
  var timerHandle = null;

  function qid() { return "q" + EXAM.questions[qIdx].n; }
  function currentCode() {
    return { html: tas.html.value, css: tas.css.value, js: tas.js.value };
  }

  /* ------------------------------------------------------------ toast --- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("toast"); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 1800);
  }

  /* ---------------------------------------------------------- preview --- */
  function renderPreview() {
    $("preview").srcdoc = LOFI.buildDocument(tas.html.value, tas.js.value, tas.css.value);
    if (started) TUT.bumpRuns(qid(), true);
  }
  var previewTimer = null;
  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(renderPreview, 600);
  }

  /* ------------------------------------------------------------ timer --- */
  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }
  function startTimer() {
    timerHandle = setInterval(function () {
      timeLeft--;
      $("timer").textContent = fmt(Math.max(0, timeLeft));
      if (timeLeft === 300) toast("Five minutes remaining");
      if (timeLeft <= 0) {
        clearInterval(timerHandle);
        $("timer").textContent = "TIME";
        toast("Time is up - save each question and submit");
      }
      if (timeLeft % 15 === 0) persist();   // keep the clock honest across reloads
    }, 1000);
  }

  /* ------------------------------------------------------ state store --- */
  function persist() {
    var x = TUT.loadExam();
    x._meta = { started: started, timeLeft: timeLeft, qIdx: qIdx };
    var rec = x[qid()] || {};
    rec.code = currentCode();
    x[qid()] = rec;
    TUT.saveExam(x);
  }
  function restore() {
    var x = TUT.loadExam();
    if (x._meta && x._meta.started) {
      started = true;
      timeLeft = x._meta.timeLeft > 0 ? x._meta.timeLeft : 0;
      qIdx = x._meta.qIdx || 0;
      $("startModal").hidden = true;
      startTimer();
    }
  }

  /* -------------------------------------------------------- questions --- */
  function loadQuestion(idx, saveFirst) {
    if (saveFirst && started) persist();
    qIdx = idx;
    var q = EXAM.questions[qIdx];
    $("qCount").textContent = "Question " + q.n + " of " + EXAM.questions.length;
    $("qTitle").textContent = "Q" + q.n + " · " + q.title + " (" + q.marks + " marks)";
    $("qSkill").textContent = "Skill: " + q.skill;
    $("qBrief").textContent = q.brief;
    $("prevBtn").disabled = qIdx === 0;
    $("nextBtn").disabled = qIdx === EXAM.questions.length - 1;
    var x = TUT.loadExam();
    var saved = x[qid()] && x[qid()].code;
    tas.html.value = saved ? saved.html : "";
    tas.css.value = saved ? saved.css : "";
    tas.js.value = saved ? saved.js : "";
    Object.keys(tas).forEach(function (k) { TUT.syncTextarea(tas[k]); });
    $("qCheckList").innerHTML = "";
    renderPreview();
  }

  function checkQuestion() {
    var q = EXAM.questions[qIdx];
    var results = TUT.runChecks(q.checks, currentCode(), null);
    var ul = $("qCheckList");
    ul.innerHTML = "";
    results.forEach(function (r) {
      var li = document.createElement("li");
      li.className = r.pass ? "pass" : "fail";
      li.textContent = r.label;
      ul.appendChild(li);
    });
    var x = TUT.loadExam();
    var rec = x[qid()] || {};
    rec.checksPassed = results.filter(function (r) { return r.pass; }).length;
    rec.checksTotal = results.length;
    x[qid()] = rec;
    TUT.saveExam(x);
    persist();
  }

  /* ------------------------------------------------------ submissions --- */
  function saveQuestion() {
    persist();
    var q = EXAM.questions[qIdx];
    var x = TUT.loadExam();
    var doc = LOFI.buildDocument(tas.html.value, tas.js.value, tas.css.value);
    doc += "\n<!-- LoFiWeb Tutorial exam submission | Question " + q.n +
      " | " + TUT.provenance(x, qid()) + " | saved " + new Date().toISOString() + " -->\n";
    var blob = new Blob([doc], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "exam-question-" + q.n + ".html";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast("Saved exam-question-" + q.n + ".html");
  }

  /* -------------------------------------------------------------- wire --- */
  function wire() {
    $("examTitle").textContent = EXAM.title;
    $("examIntro").innerHTML = LOFI.renderMarkdown(
      "**Time:** " + EXAM.minutes + " minutes. **Total marks:** " + EXAM.totalMarks + ".\n\n" +
      EXAM.instructions);
    $("timer").textContent = fmt(timeLeft);

    $("beginBtn").addEventListener("click", function () {
      started = true;
      $("startModal").hidden = true;
      startTimer();
      persist();
      TUT.loadExam();
    });
    $("prevBtn").addEventListener("click", function () { if (qIdx > 0) loadQuestion(qIdx - 1, true); });
    $("nextBtn").addEventListener("click", function () {
      if (qIdx < EXAM.questions.length - 1) loadQuestion(qIdx + 1, true);
    });
    $("clearBtn").addEventListener("click", function () {
      if (confirm("Empty all three editors for this question?")) {
        tas.html.value = ""; tas.css.value = ""; tas.js.value = "";
        Object.keys(tas).forEach(function (k) { TUT.syncTextarea(tas[k]); });
        persist(); renderPreview();
      }
    });
    $("runBtn").addEventListener("click", renderPreview);
    $("checkBtn").addEventListener("click", checkQuestion);
    $("saveQBtn").addEventListener("click", saveQuestion);
    Object.keys(tas).forEach(function (k) {
      tas[k].addEventListener("input", schedulePreview);
    });
    TUT.attachTelemetry(tas, function () { return started ? qid() : null; }, true);
    window.addEventListener("beforeunload", function () { if (started) persist(); });
  }

  wire();
  restore();
  loadQuestion(qIdx, false);
})();
