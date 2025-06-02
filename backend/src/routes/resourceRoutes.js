const express = require("express");
const router = express.Router();
const {resourceController} = require("../controller/resourceController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, resourceController.create);
router.get("/:type", resourceController.fetch);
router.put("/:id", verifyToken, resourceController.update);
router.delete("/:id", verifyToken, resourceController.delete);

module.exports = router;