const settings = require("../config/settings");
const MainController = require("../controller/MainController");
const express = require('express');
const router = express.Router();

router.get("/", MainController.UserController.fetch_All_User);
router.post("/login", MainController.UserController.fetch_User);
router.post("/SignIn", MainController.UserController.Add_User);
router.post("/DelUser", MainController.UserController.Remove_User);
router.get("/create_table", MainController.UserController.create_Table);
router.get("/delete_table", MainController.UserController.detele_Table);
router.post("/verify_user", MainController.UserController.Verify_User);
module.exports = {
    router
}