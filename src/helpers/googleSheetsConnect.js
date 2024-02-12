import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export const googleSheetConnect = async(month) => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[month-1];
  await sheet.loadCells('A1:AT201')
  return sheet
}