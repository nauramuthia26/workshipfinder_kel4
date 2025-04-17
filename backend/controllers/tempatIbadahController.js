const db = require("../config/db");

// CREATE
exports.createTempatIbadah = (req, res) => {
    const {
        user_id,
        nama_tempat,
        alamat,
        kota,
        provinsi,
        kode_pos,
        latitude,
        longitude,
        agama,
        waktu_operasi,
        deskripsi,
        kontak,
        tipologi,
        jenis
    } = req.body;

    const sql = `INSERT INTO Tempat_Ibadah 
        (user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi, jenis) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi, jenis], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "Tempat Ibadah berhasil ditambahkan", id: result.insertId });
    });
};

// READ ALL
exports.getAllTempatIbadah = (req, res) => {
    db.query("SELECT * FROM Tempat_Ibadah", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// READ BY ID
exports.getTempatIbadahById = (req, res) => {
    const { tempat_id } = req.params;
    db.query("SELECT * FROM Tempat_Ibadah WHERE tempat_id = ?", [tempat_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Tempat Ibadah tidak ditemukan" });
        res.json(result[0]);
    });
};

// UPDATE
exports.updateTempatIbadah = (req, res) => {
    const { tempat_id } = req.params;
    const {
        nama_tempat,
        alamat,
        kota,
        provinsi,
        kode_pos,
        latitude,
        longitude,
        agama,
        waktu_operasi,
        deskripsi,
        kontak,
        tipologi,
        jenis
    } = req.body;

    const sql = `UPDATE Tempat_Ibadah SET 
        nama_tempat=?, alamat=?, kota=?, provinsi=?, kode_pos=?, latitude=?, longitude=?, agama=?, waktu_operasi=?, deskripsi=?, kontak=?, tipologi=?, jenis=?
        WHERE tempat_id=?`;

    db.query(sql, [nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi, jenis, tempat_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Tempat Ibadah berhasil diupdate" });
    });
};

// DELETE
exports.deleteTempatIbadah = (req, res) => {
    const { tempat_id } = req.params;
    db.query("DELETE FROM Tempat_Ibadah WHERE tempat_id = ?", [tempat_id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Tempat Ibadah berhasil dihapus" });
    });
};
