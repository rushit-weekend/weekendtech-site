/**
 * Weekend Tech — website contact form handler (Google Apps Script).
 *
 * Bound to the "Weekend Tech — website enquiries" Google Sheet.
 * Each submission from weekendtech.org is appended to the "Enquiries" sheet
 * and emailed to hello@weekendtech.org, with Reply-To set to the visitor.
 *
 * Deploy: Deploy > New deployment > Web app
 *   Execute as: Me    Who has access: Anyone
 * Paste the /exec URL into FORM_ENDPOINT in docs/js/main.js.
 * After editing this file, use Deploy > Manage deployments > Edit > New version
 * so the same URL keeps working.
 */

const NOTIFY_TO = 'hello@weekendtech.org';
// The script sends as its owner, and Gmail keeps your own messages to a group out of
// your inbox. A direct copy to the owner makes sure they still see every enquiry.
const OWNER_COPY = 'rushit@weekendtech.org';
const SHEET_NAME = 'Enquiries';
const MAX_LEN = { name: 200, email: 254, kind: 100, message: 5000 };

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Bots fill the hidden "company" field; real visitors never see it.
  if (p.company) return json({ ok: true });

  const data = {
    name: clean(p.name, MAX_LEN.name),
    email: clean(p.email, MAX_LEN.email),
    kind: clean(p.kind, MAX_LEN.kind),
    message: clean(p.message, MAX_LEN.message),
  };

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ ok: false, error: 'missing_fields' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet().appendRow([new Date(), data.name, data.email, data.kind, data.message]);
  } finally {
    lock.releaseLock();
  }

  MailApp.sendEmail({
    to: NOTIFY_TO,
    bcc: OWNER_COPY,
    replyTo: data.email,
    name: 'Weekend Tech website',
    subject: `New enquiry: ${data.kind || 'Website'} from ${data.name}`,
    body: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Needs: ${data.kind}`,
      '',
      data.message,
      '',
      '— Sent from the contact form on weekendtech.org. Reply to this email to answer them directly.',
    ].join('\n'),
  });

  return json({ ok: true });
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json({ ok: true, service: 'weekendtech contact form' });
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Received', 'Name', 'Email', 'Needs', 'Message']);
    sh.setFrozenRows(1);
    sh.getRange('1:1').setFontWeight('bold');
  }
  return sh;
}

function clean(value, max) {
  return String(value || '').trim().slice(0, max);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
