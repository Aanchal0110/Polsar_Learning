const uploadBuffer = require('../services/uploadToDrive');

const driveUploader = async (req, res, next) => {
  try {
    const coverFile = req.files?.coverImage?.[0];
    const postContent = req.body.content;
    const title = req.body.title || 'untitled';

    if (!postContent || !coverFile) {
      return res.status(400).json({ error: 'Post content and cover image are required' });
    }

    // Convert post content (string) to buffer
    const postBuffer = Buffer.from(postContent, 'utf-8');

    // Upload post content as a .md or .html file (choose MIME accordingly)
    const postUrl = await uploadBuffer({
      buffer: postBuffer,
      name: `${title}_post.html`, // or .html if content is HTML
      folderId: process.env.GDRIVE_POST_FOLDER,
      mimeType: 'text/markdown', // or 'text/html' if HTML
    });

    // Upload cover image file
    const coverUrl = await uploadBuffer({
      buffer: coverFile.buffer,
      name: `${title}_cover.jpg`,
      folderId: process.env.GDRIVE_COVER_FOLDER,
      mimeType: coverFile.mimetype,
    });

    req.uploadedFiles = {
      postUrl,
      coverUrl,
    };

    next();
  } catch (err) {
    console.error('Drive Upload Error:', err);
    return res.status(500).json({ error: 'Failed to upload files to Google Drive' });
  }
};

module.exports = driveUploader;