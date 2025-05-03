const settings = require("../config/settings");
const MainController = require("../controller/MainController");
const express = require('express');
const upload_image = require("../middleware/imageUpload");
const router = express.Router();

router.get("/", MainController.UserController.fetch_All_User);
router.post("/login", MainController.UserController.fetch_User);
router.post("/SignIn", MainController.UserController.Add_User);
router.post("/DelUser", MainController.UserController.Remove_User);
router.get("/create_table", MainController.UserController.create_Table);
router.get("/delete_table", MainController.UserController.detele_Table);
router.post("/verify_user", MainController.UserController.Verify_User);
router.post("/upload_profile_image", upload_image.single("img"), MainController.UserController.upload_image);
router.post("/send-otp", MainController.UserController.generate_otp);
router.post("/verify-otp", MainController.UserController.verify_otp);
module.exports = {
    router
}