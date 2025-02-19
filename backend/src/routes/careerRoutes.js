const settings = require("../config/settings");
const MainController = require("../controller/MainController");
const express = require('express');
const router = express.Router();

router.get("/", MainController.CareerController.fetch_all);
router.get("/create_table", MainController.CareerController.create_table);
router.get("/delete_table", MainController.CareerController.delete_table);
router.post("/add_intership", MainController.CareerController.add_intership);
router.post("/remove_intership", MainController.CareerController.remove_intership);

module.exports = {
    router
}