const settings = require("../config/settings");
const MainController = require("../controller/MainController");
const express = require('express');
const router = express.Router();

router.get("/", MainController.ResourceController.fetch_All_Resource);
router.get("/create_table", MainController.ResourceController.create_Table);
router.get("/delete_table", MainController.ResourceController.detele_Table);
router.post("/insert", MainController.ResourceController.add_Resource);
router.post("/fetchAll", MainController.ResourceController.fetch_All_Resource);

module.exports = {
    router
}