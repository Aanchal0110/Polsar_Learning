const { google } = require("googleapis");
const path = require("path")

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/service_account.json'),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});
const drive = google.drive({ version: "v3", auth });

async function uploadRawContentToDrive(filename, content) {
  const bufferStream = require("stream").Readable.from([content]);

  const response = await drive.files.create({
    requestBody: {
      name: filename,
      mimeType: "text/html", // or text/plain
    },
    media: {
      mimeType: "text/html",
      body: bufferStream,
    },
  });

  return response.data;
}

module.exports = {
    uploadRawContentToDrive
}
