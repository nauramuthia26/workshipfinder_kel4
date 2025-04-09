const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan user MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'db_api_codeigniter'
   });

// Koneksi ke MySQL
db.connect((err) => {
    if (err) {
    throw err;
    }
    console.log('Connected to MySQL');
   });

// CREATE Users (POST)
router.post('/users', (req, res) => {
    const { id_user, nama_user, email, no_tlp, password, role } = req.body;
    const sql = `INSERT INTO users (id_user, nama_user, email, no_tlp, password, role) VALUES (?,
   ?, ?, ?, ?, ?)`;
    db.query(sql, [id_user, nama_user, email, no_tlp, password, role], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    res.status(201).send({ id_user: result.insertId, id_user, nama_user, email, no_tlp, password, role
   });
    });
   });

// READ all users (GET)
router.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, results) => {
    if (err) {
    return res.status(500).send(err);
    }
    res.status(200).send(results);
    });
   });

// READ single users by id_user (GET)
router.get('/users/:id_user', (req, res) => {
    const sql = `SELECT * FROM users WHERE id_user = ?`;
    db.query(sql, [req.params.id_user], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.length === 0) {
    return res.status(404).send({ message: 'Mahasiswa not found' });
    }
    res.status(200).send(result[0]);
    });
   });

// UPDATE Users by id_user (PUT)
router.put('/users/:id_user', (req, res) => {
    const { id_user, nama_user, email, no_tlp, password, role } = req.body;
    const sql = `UPDATE users SET id_user = ?, nama_user = ?, email = ?, no_tlp = ?, password = ?, role = ? WHERE
   id_user = ?`;
    db.query(sql, [id_user, nama_user, email, no_tlp, password, role, req.params.id_user], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
    return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ id_user: req.params.id_user, nama_user, email, no_tlp, password, role });
    });
   });

// DELETE Users by id_users (DELETE)
router.delete('/users/:id_user', (req, res) => {
    const sql = `DELETE FROM users WHERE id_user = ?`;
    db.query(sql, [req.params.id_user], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
    return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
    });
   });
   module.exports = router;