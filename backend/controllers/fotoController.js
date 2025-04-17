const db = require('../config/db');

// Tambah Foto
exports.uploadFoto = (req, res) => {
    const { tempat_id, url } = req.body;
    const sql = "INSERT INTO Foto (tempat_id, url) VALUES (?, ?)";
    db.query(sql, [tempat_id, url], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "Foto berhasil diupload", id: result.insertId });
    });
};

// Lihat Semua Foto
exports.getAllFoto = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Foto", (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Foto tidak ditemukan" });
        res.json(result[0]);
    });
};

// Lihat Foto By ID
exports.getFotoById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Foto WHERE foto_id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Foto tidak ditemukan" });
        res.json(result[0]);
    });
};


// Hapus Foto
exports.deleteFoto = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Foto WHERE foto_id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Foto berhasil dihapus" });
    });
};
