const express = require("express"); 
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE - Tambah user baru
exports.createUser = (req, res) => {
    const { nama_user, email, no_tlp, password, role } = req.body;
    const sql = "INSERT INTO Users (nama_user, email, no_tlp, password, role) VALUES (?, ?, ?, ?, 'user')";
    db.query(sql, [nama_user, email, no_tlp, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "User created", userId: result.insertId });
    });
};

// ✅ LOGIN - Autentikasi user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM Users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(401).json({ message: "Email atau password salah" });
        }

        const user = results[0];
        res.json({
            message: "Login berhasil",
            user: {
                id_user: user.id_user,
                nama_user: user.nama_user,
                email: user.email,
                role: user.role,
            }
        });
    });
};


// ✅ READ - Ambil semua user
exports.getAllUsers = (req, res) => {
    db.query("SELECT * FROM Users", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// ✅ READ - Ambil 1 user berdasarkan ID
exports.getUserById = (req, res) => {
    const { id_user } = req.params;
    db.query("SELECT * FROM Users WHERE id_user = ?", [id_user], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(result[0]);
    });
};

// ✅ UPDATE - Update user
exports.updateUser = (req, res) => {
    const { id_user } = req.params;
    const { nama_user, email, no_tlp, password, role } = req.body;
    const sql = "UPDATE Users SET nama_user=?, email=?, no_tlp=?, password=?, role=? WHERE id_user=?";
    db.query(sql, [nama_user, email, no_tlp, password, role, id_user], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User updated" });
    });
};

// ✅ DELETE - Hapus user
exports.deleteUser = (req, res) => {
    const { id_user } = req.params;
    db.query("DELETE FROM Users WHERE id_user = ?", [id_user], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "User deleted" });
    });
};
