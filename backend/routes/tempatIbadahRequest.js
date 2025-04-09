const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Tempat Ibadah Request
router.post("/", (req, res) => {
    const { id_user, nama_tempat, tipologi, provinsi, kota, alamat, kapasitas, waktu_operasi } = req.body;
    const sql = `INSERT INTO Tempat_Ibadah_Request 
                (id_user, nama_tempat, tipologi, provinsi, kota, alamat, kapasitas, waktu_operasi) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [id_user, nama_tempat, tipologi, provinsi, kota, alamat, kapasitas, waktu_operasi], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Request tempat ibadah ditambahkan", requestId: result.insertId });
    });
});

// ✅ READ Semua Request Tempat Ibadah
router.get("/", (req, res) => {
    db.query("SELECT * FROM Tempat_Ibadah_Request", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ READ Request Tempat Ibadah Berdasarkan ID Request
router.get("/:request_id", (req, res) => {
    const { request_id } = req.params;
    const sql = "SELECT * FROM Tempat_Ibadah_Request WHERE request_id=?";
    
    db.query(sql, [request_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// ✅ UPDATE Request Tempat Ibadah
router.put("/:request_id", (req, res) => {
    const { request_id } = req.params;
    const { id_user, nama_tempat, tipologi, provinsi, kota, alamat, kapasitas, waktu_operasi } = req.body;
    const sql = `UPDATE Tempat_Ibadah_Request 
                SET id_user=?, nama_tempat=?, tipologi=?, provinsi=?, kota=?, alamat=?, kapasitas=?, waktu_operasi=?
                WHERE request_id=?`;

    db.query(sql, [id_user, nama_tempat, tipologi, provinsi, kota, alamat, kapasitas, waktu_operasi, request_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Request tempat ibadah diperbarui" });
    });
});

// ✅ DELETE Request Tempat Ibadah
router.delete("/:request_id", (req, res) => {
    const { request_id } = req.params;
    const sql = "DELETE FROM Tempat_Ibadah_Request WHERE request_id=?";
    
    db.query(sql, [request_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Request tempat ibadah dihapus" });
    });
});

module.exports = router;
