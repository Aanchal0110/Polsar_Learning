const settings = require("../config/settings");
const express = require("express");
const MainController = require("../controller/MainController");
const router = express.Router();

router.get("/", MainController.CommentController.fetch_all_comments);
router.get("/create_table", MainController.CommentController.create_table);
router.get("/delete_table", MainController.CommentController.delete_table);
router.get("/fetch", MainController.CommentController.fetch_by_post);
router.get("/delete_comment", MainController.CommentController.delete_comment);

module.exports = {
    router
}