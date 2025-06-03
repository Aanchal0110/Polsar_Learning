const express = require("express");
const router = express.Router();
const {UserController} = require("../controller/userController");
const verifyToken = require('../middleware/authMiddleware');

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

// Protected route
router.get("/user/:email", verifyToken, UserController.getUserByEmail);
router.post('/send-otp', UserController.sendOtp);
router.post('/verify-otp', UserController.verifyOtp);

module.exports = router;
