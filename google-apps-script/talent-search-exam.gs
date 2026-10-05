/**
 * Radha Krishna Gurukulam - Talent Search Exam
 *
 * Receives each online exam submission from the website, scores it and adds
 * one row to the first tab of the Google Sheet this script is attached to.
 *
 * The answer key lives only here, never on the website, so students cannot
 * find the answers by viewing the page source.
 *
 * Setup: see google-apps-script/README.md.
 */

// Correct option for Q1..Q20, in order. Edit here if the paper changes.
var ANSWER_KEY = [
  'B', 'A', 'C', 'B', 'B', 'C', 'D', 'C', 'B', 'C',
  'B', 'A', 'A', 'D', 'D', 'B', 'C', 'C', 'A', 'B'
];
var MARKS_PER_QUESTION = 5;

var HEADERS = [
  'Submitted At', 'Student Name', "Father's Name", 'Contact No', 'School',
  'Address', 'Class', 'Score (out of 100)', 'Correct', 'Wrong', 'Unanswered',
  'Time Taken'
].concat(ANSWER_KEY.map(function (_, i) { return 'Q' + (i + 1); }));

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = (e && e.parameter) || {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    var correct = 0, wrong = 0, unanswered = 0;
    var answers = ANSWER_KEY.map(function (key, i) {
      var a = String(p['q' + (i + 1)] || '').trim().toUpperCase();
      if (!/^[ABCD]$/.test(a)) a = '';
      if (!a) unanswered++;
      else if (a === key) correct++;
      else wrong++;
      return a;
    });

    sheet.appendRow([
      new Date(),
      clean(p.name),
      clean(p.father),
      "'" + clean(p.phone).replace(/^'/, ''), // keep as text so leading 0 / + survive
      clean(p.school),
      clean(p.address),
      clean(p.cls),
      correct * MARKS_PER_QUESTION,
      correct,
      wrong,
      unanswered,
      formatSeconds(p.seconds)
    ].concat(answers));

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this, which confirms the deploy.
function doGet() {
  return ContentService.createTextOutput('Talent Search Exam endpoint is running.');
}

// Trims, limits length, and stops text that starts with = + - @ being
// treated as a spreadsheet formula.
function clean(v) {
  v = String(v == null ? '' : v).trim().slice(0, 300);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function formatSeconds(v) {
  var s = Math.max(0, Math.min(36000, parseInt(v, 10) || 0));
  var m = Math.floor(s / 60), r = s % 60;
  return m + ' min ' + (r < 10 ? '0' : '') + r + ' sec';
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
