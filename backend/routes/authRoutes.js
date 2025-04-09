const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const db = require('../config/db');

// Route untuk Register (POST)
router.post("/register", userController.createUser);

// Route untuk Login (POST) – bisa ditambahkan logika verifikasi nanti
router.post("/login", userController.loginUser); // (Tambahkan di controller juga)

module.exports = router;
