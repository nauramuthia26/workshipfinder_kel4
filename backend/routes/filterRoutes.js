const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filterController');
const db = require('../config/db'); 

router.get('/jenis', async (req, res) => {
  db.query('SELECT DISTINCT jenis FROM tempat_ibadah WHERE jenis IS NOT NULL', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.jenis));
  });
});

router.get('/tipologi', async (req, res) => {
    const jenis = req.query.jenis;
    db.query('SELECT DISTINCT tipologi FROM tempat_ibadah WHERE jenis = ? AND tipologi IS NOT NULL', [jenis], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results.map(row => row.tipologi));
    });
});

router.get('/provinsi', async (req, res) => {
  db.query('SELECT DISTINCT provinsi FROM tempat_ibadah WHERE provinsi IS NOT NULL', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.provinsi));
  });
});

router.get('/kota', async (req, res) => {
  const provinsi = req.query.provinsi;
  db.query('SELECT DISTINCT kota FROM tempat_ibadah WHERE provinsi = ? AND kota IS NOT NULL', [provinsi], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.kota));
  });
});

// Route hasil pencarian
router.get('/search', async (req, res) => {
  const { tipologi, provinsi, kota } = req.query;

  let query = 'SELECT * FROM tempat_ibadah WHERE 1=1';
  const params = [];

  if (tipologi) {
    query += ' AND tipologi = ?';
    params.push(tipologi);
  }

  if (provinsi) {
    query += ' AND provinsi = ?';
    params.push(provinsi);
  }

  if (kota) {
    query += ' AND kota = ?';
    params.push(kota);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


module.exports = router;
