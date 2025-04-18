const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ Handle Contact Form Submission
router.post("/contact", (req, res) => {
    const { nama, email, pesan } = req.body;
    
    // Basic validation
    if (!nama || !email || !pesan) {
        return res.status(400).json({ error: "Nama, email harus diisi" });
    }

    const sql = `INSERT INTO Kontak (nama, email, pesan) VALUES (?, ?, ?)`;

    db.query(sql, [nama, email, pesan], (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal menyimpan data kontak" });
        res.json({ message: "Pesan Anda telah terkirim. Terima kasih!" });
    });
});

module.exports = router;