const express = require("express");
const router = express.Router();
const db = require('../config/db');

router.post("/", (req, res) => {
    const { jadwal_id, tempat_ibadah_id, hari, waktu, keterangan } = req.body; // Tambahkan jadwal_id
    const sql = "INSERT INTO jadwal_ibadah (jadwal_id, tempat_ibadah_id, hari, waktu, keterangan) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [jadwal_id, tempat_ibadah_id, hari, waktu, keterangan], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Jadwal ibadah ditambahkan", jadwalId: jadwal_id });
    });
});

// ✅ READ Jadwal Ibadah
router.get("/", (req, res) => {
    db.query("SELECT * FROM jadwal_ibadah", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.put("/:jadwal_id", (req, res) => {
    const { jadwal_id } = req.params;
    const { tempat_ibadah_id, hari, waktu, keterangan } = req.body;
    const sql = "UPDATE jadwal_ibadah SET tempat_ibadah_id=?, hari=?, waktu=?, keterangan=? WHERE jadwal_id=?";
    db.query(sql, [tempat_ibadah_id, hari, waktu, keterangan, jadwal_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Jadwal ibadah diperbarui" });
    });
});


router.delete("/:jadwal_id", (req, res) => {
    const { jadwal_id } = req.params;
    const sql = "DELETE FROM jadwal_ibadah WHERE jadwal_id=?";
    db.query(sql, [jadwal_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Jadwal ibadah dihapus" });
    });
});


module.exports = router;
