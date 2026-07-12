/* LoFiWeb Tutorial — progress store, requirement checker and effort telemetry.
   Shared by ide.html (lessons), exam.html and progress.html.

   Honest note for teachers: everything here is client-side. The flags raise
   the effort bar and give you signals to start a conversation - they are not
   proof, and a determined student can clear localStorage. Pair them with
   looking at the student's actual code. */
window.TUT = (function () {
  "use strict";

  var KEY = "tut:progress";
  var EXAM_KEY = "tut:exam";

  /* ------------------------------------------------------------- store --- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(p) { localStorage.setItem(KEY, JSON.stringify(p)); }
  function loadExam() {
    try { return JSON.parse(localStorage.getItem(EXAM_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveExam(x) { localStorage.setItem(EXAM_KEY, JSON.stringify(x)); }

  function record(lessonId) {
    var p = load();
    if (!p[lessonId]) {
      p[lessonId] = {
        status: "started", typed: 0, pasted: 0, largestPaste: 0,
        runs: 0, seconds: 0, flags: [], startedAt: Date.now()
      };
      save(p);
    }
    return p[lessonId];
  }

  /* ------------------------------------------------------ text helpers --- */
  function normalize(s) {
    return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }
  function allCode(code) {
    return (code.html || "") + "\n" + (code.css || "") + "\n" + (code.js || "");
  }
  /* Dice coefficient on character bigrams: 0 (different) .. 1 (identical) */
  function similarity(a, b) {
    a = normalize(a); b = normalize(b);
    if (!a.length || !b.length) return a === b ? 1 : 0;
    if (a === b) return 1;
    function bigrams(s) {
      var m = {};
      for (var i = 0; i < s.length - 1; i++) {
        var g = s.substr(i, 2);
        m[g] = (m[g] || 0) + 1;
      }
      return m;
    }
    var ma = bigrams(a), mb = bigrams(b), shared = 0, ta = 0, tb = 0, g;
    for (g in ma) { ta += ma[g]; if (mb[g]) shared += Math.min(ma[g], mb[g]); }
    for (g in mb) { tb += mb[g]; }
    return (2 * shared) / (ta + tb);
  }
  function countMatches(text, reSrc) {
    try {
      var re = new RegExp(reSrc, "g");
      var m = String(text || "").match(re);
      return m ? m.length : 0;
    } catch (e) { return 0; }
  }

  /* ----------------------------------------------------------- checker --- */
  /* checks: array of { html|css|js|differs, min?, label }
     code:   { html, css, js } from the editors
     sample: { html, css, js } | null  (the lesson's example) */
  function runChecks(checks, code, sample) {
    var doc = null;
    return (checks || []).map(function (c) {
      var pass = false;
      if (c.html) {
        if (!doc) doc = new DOMParser().parseFromString(code.html || "", "text/html");
        try { pass = doc.querySelectorAll(c.html).length >= (c.min || 1); }
        catch (e) { pass = false; }
      } else if (c.css) {
        pass = countMatches(code.css, c.css) >= (c.min || 1);
      } else if (c.js) {
        pass = countMatches(code.js, c.js) >= (c.min || 1);
      } else if (c.differs) {
        pass = sample ? similarity(allCode(code), allCode(sample)) < 0.9 : true;
      }
      return { label: c.label || "Requirement", pass: pass };
    });
  }
  function allPass(results) {
    for (var i = 0; i < results.length; i++) if (!results[i].pass) return false;
    return results.length > 0;
  }

  /* ------------------------------------------------- untaught syntax ----- */
  /* Constructs this course never teaches. Their presence in a beginner's
     "passing" solution is a classic sign of pasted AI or copied code. */
  var ADVANCED = [
    { re: /=>/, what: "arrow functions" },
    { re: /`/, what: "template literals (backticks)" },
    { re: /\bconst\b/, what: "const" },
    { re: /querySelector/, what: "querySelector" },
    { re: /addEventListener/, what: "addEventListener" },
    { re: /\bfetch\s*\(/, what: "fetch" },
    { re: /\basync\b|\bawait\b/, what: "async/await" },
    { re: /\.forEach\s*\(|\.map\s*\(|\.filter\s*\(|\.reduce\s*\(/, what: "array methods like forEach/map" },
    { re: /\bclass\s+\w+\s*\{/, what: "JavaScript classes" },
    { re: /\btry\s*\{|\bcatch\s*\(/, what: "try/catch" }
  ];
  function untaughtSyntax(code) {
    var src = (code.js || "") + "\n" + (code.html || "");
    var found = [];
    for (var i = 0; i < ADVANCED.length; i++) {
      if (ADVANCED[i].re.test(src)) found.push(ADVANCED[i].what);
    }
    return found;
  }

  /* ----------------------------------------------------------- flags ----- */
  var FLAG_TEXT = {
    MOSTLY_PASTED: "Most of this code arrived by paste rather than typing",
    MATCHES_SAMPLE: "The final code is nearly identical to the lesson example",
    UNTAUGHT_SYNTAX: "Uses techniques this course never taught",
    ONE_SHOT: "Passed after a single large paste with almost no editing"
  };
  function computeFlags(rec, code, sample) {
    var flags = [];
    var total = rec.typed + rec.pasted;
    if (rec.pasted > 200 && total > 0 && rec.pasted / total > 0.6) flags.push("MOSTLY_PASTED");
    if (sample && similarity(allCode(code), allCode(sample)) >= 0.9) flags.push("MATCHES_SAMPLE");
    var adv = untaughtSyntax(code);
    if (adv.length) flags.push("UNTAUGHT_SYNTAX");
    if (rec.largestPaste > 300 && rec.typed < 40) flags.push("ONE_SHOT");
    return { flags: flags, advanced: adv };
  }

  /* -------------------------------------------------------- telemetry ---- */
  /* attach({ html: textarea, css: textarea, js: textarea }, getActiveId)
     getActiveId() returns the lesson/question id stats should accrue to,
     or null when nothing is active. */
  function attachTelemetry(tas, getActiveId, useExamStore) {
    var prevLen = {};
    var lastActivity = 0;
    Object.keys(tas).forEach(function (k) {
      prevLen[k] = tas[k].value.length;
      tas[k].addEventListener("input", function (e) {
        var id = getActiveId();
        var delta = tas[k].value.length - prevLen[k];
        prevLen[k] = tas[k].value.length;
        lastActivity = Date.now();
        if (!id || delta <= 0) return;
        var store = useExamStore ? loadExam() : load();
        var rec = store[id];
        if (!rec) {
          rec = store[id] = {
            status: "started", typed: 0, pasted: 0, largestPaste: 0,
            runs: 0, seconds: 0, flags: [], startedAt: Date.now()
          };
        }
        var pasted = e && (e.inputType === "insertFromPaste" || e.inputType === "insertFromDrop");
        if (pasted) {
          rec.pasted += delta;
          if (delta > rec.largestPaste) rec.largestPaste = delta;
        } else {
          rec.typed += delta;
        }
        if (useExamStore) saveExam(store); else save(store);
      });
      /* value replaced programmatically (Load example) must not count as typing */
      tas[k].addEventListener("tut-sync", function () { prevLen[k] = tas[k].value.length; });
    });
    /* active-seconds heartbeat: 5s ticks while there was activity in the last minute */
    setInterval(function () {
      var id = getActiveId();
      if (!id || Date.now() - lastActivity > 60000) return;
      var store = useExamStore ? loadExam() : load();
      if (store[id]) {
        store[id].seconds += 5;
        if (useExamStore) saveExam(store); else save(store);
      }
    }, 5000);
  }
  /* call after setting textarea values from code so the length delta
     is not misread as a giant paste */
  function syncTextarea(ta) { ta.dispatchEvent(new Event("tut-sync")); }

  function bumpRuns(id, useExamStore) {
    if (!id) return;
    var store = useExamStore ? loadExam() : load();
    if (store[id]) {
      store[id].runs += 1;
      if (useExamStore) saveExam(store); else save(store);
    }
  }

  function markComplete(lessonId, code, sample) {
    var p = load();
    var rec = p[lessonId] || record(lessonId);
    p = load(); rec = p[lessonId];
    var f = computeFlags(rec, code, sample);
    rec.status = "complete";
    rec.flags = f.flags;
    rec.advanced = f.advanced;
    rec.completedAt = Date.now();
    save(p);
    return rec;
  }

  /* -------------------------------------------------------- reporting ---- */
  function lessonById(id) {
    for (var c = 0; c < window.COURSES.length; c++) {
      var ls = window.COURSES[c].lessons;
      for (var l = 0; l < ls.length; l++) if (ls[l].id === id) return ls[l];
    }
    return null;
  }
  function summary() {
    var p = load();
    var out = { courses: [], complete: 0, total: 0, flagged: 0 };
    window.COURSES.forEach(function (course) {
      var cs = { id: course.id, title: course.title, lessons: [] };
      course.lessons.forEach(function (les) {
        var rec = p[les.id] || null;
        out.total++;
        if (rec && rec.status === "complete") out.complete++;
        if (rec && rec.flags && rec.flags.length) out.flagged++;
        cs.lessons.push({ lesson: les, rec: rec });
      });
      out.courses.push(cs);
    });
    return out;
  }
  /* tiny non-cryptographic checksum so casual edits to the report are visible */
  function checksum(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return ("00000000" + h.toString(16)).slice(-8);
  }
  function reportText() {
    var s = summary();
    var lines = [];
    lines.push("LoFiWeb Tutorial - progress report");
    lines.push("Generated: " + new Date().toISOString());
    lines.push("Lessons complete: " + s.complete + " / " + s.total);
    lines.push("");
    s.courses.forEach(function (c) {
      lines.push(c.title);
      c.lessons.forEach(function (row) {
        var r = row.rec;
        var status = r ? r.status : "not started";
        var bits = [row.lesson.title, status];
        if (r) {
          var total = r.typed + r.pasted;
          var typedPct = total ? Math.round(100 * r.typed / total) : 100;
          bits.push("typed " + typedPct + "%");
          bits.push(Math.round(r.seconds / 60) + " min");
          bits.push(r.runs + " runs");
          if (r.flags && r.flags.length) bits.push("FLAGS: " + r.flags.join(", "));
        }
        lines.push("  - " + bits.join(" | "));
      });
      lines.push("");
    });
    var body = lines.join("\n");
    return body + "\nIntegrity: " + checksum(body) + "\n";
  }
  /* one-line provenance summary for embedding in exam submissions */
  function provenance(store, id) {
    var r = store[id];
    if (!r) return "no telemetry";
    var total = r.typed + r.pasted;
    var typedPct = total ? Math.round(100 * r.typed / total) : 100;
    var s = "typed " + typedPct + "% | pasted " + (100 - typedPct) + "% | " +
      Math.round(r.seconds / 60) + " min | " + r.runs + " runs";
    if (r.flags && r.flags.length) s += " | flags: " + r.flags.join(",");
    return s + " | check " + checksum(s + id);
  }

  return {
    load: load, save: save, loadExam: loadExam, saveExam: saveExam,
    record: record, runChecks: runChecks, allPass: allPass,
    computeFlags: computeFlags, markComplete: markComplete,
    attachTelemetry: attachTelemetry, syncTextarea: syncTextarea, bumpRuns: bumpRuns,
    summary: summary, reportText: reportText, provenance: provenance,
    lessonById: lessonById, similarity: similarity, untaughtSyntax: untaughtSyntax,
    FLAG_TEXT: FLAG_TEXT, checksum: checksum
  };
})();
