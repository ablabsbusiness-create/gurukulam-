/**
 * Radha Krishna Gurukulam - Talent Search Exam registrations
 *
 * Receives each registration from the website's Talent Search Exam form and
 * adds one row to the "Registrations" tab of the Google Sheet this script is
 * attached to (the tab is created on the first registration).
 *
 * Setup: see google-apps-script/README.md.
 */

var SHEET_NAME = 'Registrations';
var HEADERS = [
  'Submitted At', 'Student Name', "Father's Name", 'Contact No', 'Class',
  'School', 'Address'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var p = (e && e.parameter) || {};
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([
      new Date(),
      clean(p.name),
      clean(p.father),
      "'" + clean(p.phone).replace(/^'/, ''), // keep as text so leading 0 / + survive
      clean(p.cls),
      clean(p.school),
      clean(p.address)
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this, which confirms the deploy.
function doGet() {
  return ContentService.createTextOutput('Talent Search Exam registration endpoint is running.');
}

// Trims, limits length, and stops text that starts with = + - @ being
// treated as a spreadsheet formula.
function clean(v) {
  v = String(v == null ? '' : v).trim().slice(0, 300);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
