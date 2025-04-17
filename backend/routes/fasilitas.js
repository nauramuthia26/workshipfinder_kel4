const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Fasilitas
router.post("/", (req, res) => {
    const { tempat_ibadah_id, nama_fasilitas, deskripsi } = req.body;
    const sql = "INSERT INTO fasilitas (tempat_ibadah_id, nama_fasilitas, deskripsi) VALUES (?, ?, ?)";
    
    db.query(sql, [tempat_ibadah_id, nama_fasilitas, deskripsi], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Fasilitas ditambahkan", fasilitasId: result.insertId });
    });
});

// ✅ READ Semua Fasilitas
router.get("/", (req, res) => {
    db.query("SELECT * FROM fasilitas", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ READ Fasilitas Berdasarkan tempat_ibadah_id
router.get("/:tempat_ibadah_id", (req, res) => {
    const { tempat_ibadah_id } = req.params;
    const sql = "SELECT * FROM fasilitas WHERE tempat_ibadah_id=?";
    
    db.query(sql, [tempat_ibadah_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ UPDATE Fasilitas
router.put("/:fasilitas_id", (req, res) => {
    const { fasilitas_id } = req.params;
    const { tempat_ibadah_id, nama_fasilitas, deskripsi } = req.body;
    const sql = "UPDATE fasilitas SET tempat_ibadah_id=?, nama_fasilitas=?, deskripsi=? WHERE fasilitas_id=?";
    
    db.query(sql, [tempat_ibadah_id, nama_fasilitas, deskripsi, fasilitas_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Fasilitas diperbarui" });
    });
});

// ✅ DELETE Fasilitas
router.delete("/:fasilitas_id", (req, res) => {
    const { fasilitas_id } = req.params;
    const sql = "DELETE FROM fasilitas WHERE fasilitas_id=?";
    
    db.query(sql, [fasilitas_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Fasilitas dihapus" });
    });
});

// Mengambil fasilitas dari satu tempat ibadah
exports.getFasilitasByTempatIbadah = (req, res) => {
    const tempatIbadahId = req.params.id;
    const sql = "SELECT * from fasilitas WHERE tempat_ibadah_id = ? ";

    db.query(sql, [tempatIbadahId], (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil fasilitas", error: err });
        res.json(results);
    });
};

module.exports = router;
