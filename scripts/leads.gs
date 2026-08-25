/**
 * Google Sheets webhook for B2G lead forms.
 *
 * Setup:
 * 1. Open the target Google Sheet (Leads tab will be created if missing).
 * 2. Extensions → Apps Script, paste this file, Save.
 * 3. Deploy → New deployment → Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 4. Put the web app URL in .env.local as VITE_LEADS_WEBHOOK_URL
 *    and in GitHub → Settings → Secrets as VITE_LEADS_WEBHOOK_URL.
 *
 * IMPORTANT: use openById so leads always land in this sheet, even if the
 * script project is later copied or unbound from the wrong spreadsheet.
 */
const SPREADSHEET_ID = '11xbzVsnCxa-P2GboH3mlAmuQXeAcB2oGzY4HT_Jkzyk';
const SHEET_NAME = 'Leads';

const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Country',
  'Role',
  'Message',
  'Language',
  'Language name',
  'Page',
  'Source',
  'Site',
  'Device',
  'Form',
  'Consents Accepted',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Term',
  'UTM Content',
];

function getLeadsSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some((header, i) => String(firstRow[i] || '') !== header);
  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

function doPost(e) {
  const sheet = getLeadsSheet_();
  const data = (e && e.parameter) || {};

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.country || '',
    data.role || '',
    data.message || '',
    data.language || '',
    data.languageName || '',
    data.page || '',
    data.source || 'website',
    data.site || '',
    data.device || '',
    data.form || 'contact',
    data.consentsAccepted || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
    data.utmTerm || '',
    data.utmContent || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, sheet: SHEET_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('B2G leads webhook is live');
}
