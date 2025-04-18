const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Ulasan
router.post("/", (req, res) => {
    const { id_user, tempat_ibadah_id, komentar } = req.body;
    const sql = `INSERT INTO Ulasan (id_user, tempat_ibadah_id, komentar) VALUES (?, ?, ?)`;

    db.query(sql, [id_user, tempat_ibadah_id, komentar], (err, result) => {
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

// ✅ READ Semua Ulasan dengan Data User
router.get("/", (req, res) => {
    const sql = `
        SELECT Ulasan.ulasan_id, Ulasan.komentar, users.id_user, users.nama_user, users.email
        FROM Ulasan
        JOIN users ON Ulasan.id_user = users.id_user
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ READ Semua Ulasan oleh User tertentu
router.get("/user/:id_user", (req, res) => {
    const { id_user } = req.params;  // Mendapatkan id_user dari parameter URL
    const sql = `
        SELECT Ulasan.ulasan_id, Ulasan.komentar, users.id_user, users.nama_user, users.email
        FROM Ulasan
        JOIN users ON Ulasan.id_user = users.id_user
        WHERE Ulasan.id_user = ?
    `;

    db.query(sql, [id_user], (err, results) => {
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
