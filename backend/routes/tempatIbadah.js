const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Tempat Ibadah
router.post("/", (req, res) => {
    const { tempat_id, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi } = req.body;
    const sql = "INSERT INTO Tempat_Ibadah (tempat_id, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [tempat_id, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Tempat Ibadah created", tempatId: tempat_id });
    });
});


// ✅ READ Semua Tempat Ibadah
router.get("/", (req, res) => {
    db.query("SELECT * FROM Tempat_Ibadah", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ READ Detail Tempat
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Tempat_Ibadah WHERE tempat_id=?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Tempat Ibadah not found" });
        res.json(result[0]);
    });
});

// ✅ UPDATE Tempat Ibadah
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi } = req.body;
    const sql = "UPDATE Tempat_Ibadah SET user_id=?, nama_tempat=?, alamat=?, kota=?, provinsi=?, kode_pos=?, latitude=?, longitude=?, agama=?, waktu_operasi=?, deskripsi=?, kontak=?, tipologi=? WHERE tempat_id=?";
    db.query(sql, [user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Tempat Ibadah updated" });
    });
});

// ✅ DELETE Tempat Ibadah
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Tempat_Ibadah WHERE tempat_id=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Tempat Ibadah deleted" });
    });
});

// ✅ GET tempat-ibadah Lihat semua ulasan
router.get("/:id/ulasan", (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT r.*, u.nama_user FROM reviews r JOIN users u ON r.user_id = u.id_user WHERE r.tempat_ibadah_id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get("/:id/fasilitas", (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT * FROM fasilitas 
        WHERE tempat_ibadah_id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.post("/:id/ulasan", (req, res) => {
    const { id } = req.params; // ID tempat ibadah
    const { user_id, rating, komentar } = req.body;

    const sql = `
        INSERT INTO reviews (tempat_ibadah_id, user_id, rating, komentar)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id, user_id, rating, komentar], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Ulasan berhasil ditambahkan", reviewId: result.insertId });
    });
});


module.exports = router;
