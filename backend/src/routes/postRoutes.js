const settings = require("../config/settings");
const express = require("express");
const MainController = require("../controller/MainController");
const router = express.Router();

router.get("/", MainController.PostController.fetch_all_post_details);
router.get("/Create_table", MainController.PostController.create_table);
router.get("/DelTable", MainController.PostController.delete_table);
router.post("/insert", MainController.PostController.insert_post);
router.post("/fetch_post", MainController.PostController.fetch_single_post);

module.exports = {
    router
}