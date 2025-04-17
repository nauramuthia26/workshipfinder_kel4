const db = require("../config/db");

// CREATE
exports.createEvent = (req, res) => {
    const { tempat_id, nama_event, deskripsi, tanggal_mulai, tanggal_selesai } = req.body;
    db.query(
        "INSERT INTO Event (tempat_id, nama_event, deskripsi, tanggal_mulai, tanggal_selesai) VALUES (?, ?, ?, ?, ?)",
        [tempat_id, nama_event, deskripsi, tanggal_mulai, tanggal_selesai],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ message: "Event berhasil dibuat", id: result.insertId });
        }
    );
};

// READ BY ID
exports.getEventById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM Event WHERE event_id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "Event tidak ditemukan" });
        res.json(result[0]);
    });
};

// UPDATE
exports.updateEvent = (req, res) => {
    const { id } = req.params;
    const { nama_event, deskripsi, tanggal_mulai, tanggal_selesai } = req.body;
    db.query(
        "UPDATE Event SET nama_event=?, deskripsi=?, tanggal_mulai=?, tanggal_selesai=? WHERE event_id=?",
        [nama_event, deskripsi, tanggal_mulai, tanggal_selesai, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Event berhasil diupdate" });
        }
    );
};

// DELETE
exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Event WHERE event_id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Event berhasil dihapus" });
    });
};
