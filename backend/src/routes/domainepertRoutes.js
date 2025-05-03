const settings = require("../config/settings");
const express = require("express");
const MainController = require("../controller/MainController");
const router = express.Router();
const multer = require("multer");
const uploads = multer({ dest: "uploads/" });
const imageUpload = require("../middleware/imageUpload");

router.get("/", MainController.DomainExpertController.fetch_all);
router.get("/Create_table", MainController.DomainExpertController.create_table);
router.get("/delete_table", MainController.DomainExpertController.delete_table);
router.post("/fetch_type", MainController.DomainExpertController.fetch);
router.post("/add_image", MainController.DomainExpertController.add_images);
router.post("/insert", MainController.DomainExpertController.add_cards);
router.post("/upload_images", imageUpload.single("image"), MainController.DomainExpertController.uploadImages);

module.exports = {
    router
}