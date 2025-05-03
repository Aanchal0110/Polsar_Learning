const settings = require("../config/settings");
const express = require("express");
const MainController = require("../controller/MainController");
const router = express.Router();
const multer = require("multer");
const uploads = multer({ dest: "uploads/" });
const imageUpload = require("../middleware/imageUpload");

router.get("/", MainController.PostController.fetch_all_post_details);
router.get("/Create_table", MainController.PostController.create_table);
router.get("/DelTable", MainController.PostController.delete_table);
router.post("/insert", MainController.PostController.insert_post);
router.post("/fetch_post", MainController.PostController.fetch_single_post);
router.post("/add_cover_page", MainController.PostController.add_cover_page);
router.post("/upload_cover_image", imageUpload.single("image"), MainController.PostController.uploadImages);

module.exports = {
    router
}