const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Ulasan
router.post("/", (req, res) => {
    const { id_user, tempat_ibadah_id, komentar } = req.body;
    const sql = `INSERT INTO Ulasan (user_id, tempat_ibadah_id, komentar) VALUES (?, ?, ?)`;

    db.query(sql, [user_id, tempat_ibadah_id, komentar], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Ulasan berhasil ditambahkan", ulasanId: result.insertId });
    });
});

// ✅ READ Semua Ulasan
router.get("/", (req, res) => {
    db.query("SELECT * FROM Ulasan", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ READ Ulasan Berdasarkan `ulasan_id`
router.get("/:ulasan_id", (req, res) => {
    const { ulasan_id } = req.params;
    const sql = "SELECT * FROM Ulasan WHERE ulasan_id=?";

    db.query(sql, [ulasan_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result.length > 0 ? result[0] : { message: "Ulasan tidak ditemukan" });
    });
});

// ✅ UPDATE Ulasan (Edit Komentar)
router.put("/:ulasan_id", (req, res) => {
    const { ulasan_id } = req.params;
    const { komentar } = req.body;
    const sql = `UPDATE Ulasan SET komentar=? WHERE ulasan_id=?`;

    db.query(sql, [komentar, ulasan_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Ulasan berhasil diperbarui" });
    });
});

// ✅ DELETE Ulasan
router.delete("/:ulasan_id", (req, res) => {
    const { ulasan_id } = req.params;
    const sql = "DELETE FROM Ulasan WHERE ulasan_id=?";

    db.query(sql, [ulasan_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Ulasan berhasil dihapus" });
    });
});

module.exports = router;
