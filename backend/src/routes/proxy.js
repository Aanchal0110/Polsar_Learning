// routes/proxy.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/fetch-drive-file/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  try {
    const response = await axios.get(url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Failed to fetch file from Google Drive");
  }
});

module.exports = router;
