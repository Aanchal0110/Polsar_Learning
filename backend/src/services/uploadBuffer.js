const { google } = require('googleapis');
const { Readable } = require('stream');

async function uploadBuffer({ buffer, name, folderId, mimeType, auth }) {
  if (!buffer || !name || !folderId || !mimeType) {
    throw new Error('Missing required parameters for uploadBuffer');
  }

  const drive = google.drive({ version: 'v3', auth });

  // Convert Buffer to readable stream
  const bufferStream = new Readable();
  bufferStream.push(buffer);
  bufferStream.push(null);

  const response = await drive.files.create({
    requestBody: {
      name,
      parents: [folderId],
      mimeType,
    },
    media: {
      mimeType,
      body: bufferStream,
    },
    fields: 'id, webViewLink, webContentLink',
  });

  return response.data.webViewLink || response.data.webContentLink || null;
}

module.exports = uploadBuffer;
