const express = require("express");
const router = express.Router();
const db = require('../config/db');


// ✅ CREATE User
router.post("/", (req, res) => {
    const { nama_user, email, no_tlp, password, role } = req.body;
    const sql = "INSERT INTO Users (nama_user, email, no_tlp, password, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nama_user, email, no_tlp, password, role], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User created", userId: result.insertId });
    });
});

// ✅ READ Users
router.get("/", (req, res) => {
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ✅ UPDATE User
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nama_user, email, no_tlp, password, role } = req.body;
    const sql = "UPDATE Users SET nama_user=?, email=?, no_tlp=?, password=?, role=? WHERE id_user=?";
    db.query(sql, [nama_user, email, no_tlp, password, role, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User updated" });
    });
});

// ✅ DELETE User
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Users WHERE id_user=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User deleted" });
    });

});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (nama_user, password, email, no_tlp, role) VALUES (?, ?, "", "", "user")';
  
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error('Gagal insert:', err);
        return res.status(500).send('Gagal mendaftar');
      }
      console.log('User berhasil didaftarkan:', result.insertId);
      res.redirect('/login.html'); // redirect ke halaman login setelah sukses
    });
});

router.get('/:id/ulasan', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT r.*, t.nama_tempat 
        FROM reviews r
        JOIN Tempat_Ibadah t ON r.tempat_ibadah_id = t.tempat_id
        WHERE r.user_id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/:id/tempatIbadah', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Tempat_Ibadah WHERE user_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
