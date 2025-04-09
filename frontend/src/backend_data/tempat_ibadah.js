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

// CREATE tempat_ibadah (POST)
router.post('/tempat_ibadah', (req, res) => {
    const { id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi } = req.body;
    const sql = `INSERT INTO tempat_ibadah (id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi) VALUES (?,
   ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    res.status(201).send({ id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi
   });
    });
   });

// READ all tempat_ibadah (GET)
router.get('/tempat_ibadah', (req, res) => {
    const sql = `SELECT * FROM tempat_ibadah`;
    db.query(sql, (err, results) => {
    if (err) {
    return res.status(500).send(err);
    }
    res.status(200).send(results);
    });
   });

// READ single tempat_ibadah by id_tempat (GET)
router.get('/tempat_ibadah/:id_tempat', (req, res) => {
    const sql = `SELECT * FROM tempat_ibadah WHERE id_tempat = ?`;
    db.query(sql, [req.params.id_user], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.length === 0) {
    return res.status(404).send({ message: 'Tempat not found' });
    }
    res.status(200).send(result[0]);
    });
   });

// UPDATE tempat_ibadah by id_tempat (PUT)
router.put('/tempat_ibadah/:id_tempat', (req, res) => {
    const { id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi } = req.body;
    const sql = `UPDATE users SET id_tempat = ?, user_id = ?, nama_tempat = ?, alamat = ?, kota = ?, provinsi = ?, kode_pos = ?, latitude = ?, longitude = ?, agama = ?, waktu_operasi = ?, deskripsi = ?, kontak = ?, tipologi = ? WHERE
   id_tempat = ?`;
    db.query(sql, [id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi, req.params.id_tempat], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
    return res.status(404).send({ message: 'Tempat not found' });
    }
    res.status(200).send({ id_tempat: req.params.id_tempat, user_id, nama_tempat, alamat, kota, provinsi, kode_pos, latitude, longitude, agama, waktu_operasi, deskripsi, kontak, tipologi });
    });
   });

// DELETE tempat_ibadah by id_tempat (DELETE)
router.delete('/tempat_ibadah/:id_tempat', (req, res) => {
    const sql = `DELETE FROM tempat_ibadah WHERE id_tempat = ?`;
    db.query(sql, [req.params.id_tempat], (err, result) => {
    if (err) {
    return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
    return res.status(404).send({ message: 'Tempat not found' });
    }
    res.status(200).send({ message: 'Tempat deleted successfully' });
    });
   });
   module.exports = router;