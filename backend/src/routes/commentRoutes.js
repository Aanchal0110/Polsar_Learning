const settings = require("../config/settings");
const express = require("express");
const MainController = require("../controller/MainController");
const router = express.Router();

router.get("/", MainController.CommentController.fetch_all_comments);

module.exports = {
    routerm
}