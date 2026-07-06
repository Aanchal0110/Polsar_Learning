const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const driverUploader = require("../middleware/uploadToDriveMiddleware");
const { postController } = require("../controller/postControlller");
const verifyToken = require("../middleware/authMiddleware");

router.post('/',
    verifyToken,
    upload.fields([{ name: 'coverImage', maxCount: 1 }]),
    driverUploader,
    postController.create);
router.get('/', postController.getAllPosts);
router.get('/tag/:tagName', postController.getPostByTag);
router.get('/user/:user_id', postController.getPostByUser);
router.get('/search', postController.getPostByTitle);
router.put('/:post_id', verifyToken, postController.updatePost);
router.delete('/:post_id', verifyToken, postController.deletePost);

module.exports = router;