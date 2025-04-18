const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loginRateLimiter = require('../middlewares/loginRateLimiter');
const authController = require('../controllers/authController');
const db = require('../config/db');

// Route untuk Register (POST)
router.post("/register", userController.createUser);

// Route untuk Login (POST) – bisa ditambahkan logika verifikasi nanti
router.post("/login", loginRateLimiter, userController.loginUser); 

router.post("/google", authController.googleLogin);

module.exports = router;