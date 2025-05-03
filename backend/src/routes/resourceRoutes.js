const settings = require("../config/settings");
const MainController = require("../controller/MainController");
const express = require('express');
const upload = require("../middleware/fileUpload");
const imageUpload = require("../middleware/imageUpload");
const router = express.Router();
const multer = require("multer");
const uploads = multer({dest:"uploads/"})

router.get("/", MainController.ResourceController.fetch_All_Resource);
router.get("/create_table", MainController.ResourceController.create_Table);
router.get("/delete_table", MainController.ResourceController.detele_Table);
router.post("/insert",uploads.single("cover_image"),MainController.ResourceController.add_Resource);
router.post("/fetchAll", MainController.ResourceController.fetch_All_Resource);
router.post("/upload_pdf", upload.single("pdf"), MainController.ResourceController.uploadFile);
router.post("/upload_images", imageUpload.single("image"), MainController.ResourceController.uploadImages);
router.post("/add_images", MainController.ResourceController.add_cover_page);
// router.post("/admin_resource");



module.exports = {
    router
}