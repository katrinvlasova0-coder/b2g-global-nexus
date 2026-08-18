/**
 * Google Sheets webhook for B2G lead forms.
 *
 * Setup:
 * 1. Create a Google Sheet, add a tab named Leads.
 * 2. Extensions → Apps Script, paste this file, Save.
 * 3. Deploy → New deployment → Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 4. Put the web app URL in .env.local as VITE_LEADS_WEBHOOK_URL
 *    and in GitHub → Settings → Secrets as VITE_LEADS_WEBHOOK_URL.
 */
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

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  const data = e.parameter || {};
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
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput('B2G leads webhook is live');
}
