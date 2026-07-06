const { google } = require("googleapis");
const { Readable } = require("stream");
const path = require("path");

require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../config/service_account.json'),
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const driveService = google.drive({ version: 'v3', auth });

async function uploadBuffer({ buffer, name, folderId, mimeType }) {
  try {
    const fileMetadata = {
      name,
      parents: [folderId],
    };

    // Convert Buffer to Readable stream
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    const media = {
      mimeType,
      body: bufferStream,
    };

    const file = await driveService.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });

    await driveService.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const publicUrl = `https://drive.google.com/uc?id=${file.data.id}`;
    return publicUrl;
  } catch (error) {
    console.error('Google Drive uploadBuffer error:', error.message);
    throw error;
  }
}

module.exports = uploadBuffer;
