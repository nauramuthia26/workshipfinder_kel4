const express = require('express');
const router = express.Router();
const filterController = require('../routes/filterRoutes');
const db = require('../config/db'); 

exports.getJenis = (req, res) => {
  const sql = 'SELECT DISTINCT jenis FROM tempat_ibadah ORDER BY jenis ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting jenis:', err);
      return res.status(500).json({ message: 'Gagal mengambil data jenis' });
    }
    res.json(results.map(row => row.jenis));
  });
};

exports.getTipologibyJenis = (req, res) => {
    const { jenis } = req.query;
    let sql;
    let params = [];
  
    if (jenis) {
      sql = 'SELECT DISTINCT tipologi FROM tempat_ibadah WHERE jenis = ? ORDER BY tipologi ASC';
      params = [jenis];
    } else {
      sql = 'SELECT DISTINCT tipologi FROM tempat_ibadah ORDER BY jenis ASC';
    }

    db.query(sql, params, (err, results) => {
        if (err) {
          console.error('Error getting tipologi:', err);
          return res.status(500).json({ message: 'Gagal mengambil data tipologi' });
        }
        res.json(results.map(row => row.tipologi));
      });
};
    
exports.getProvinsi = (req, res) => {
  const sql = 'SELECT DISTINCT provinsi FROM tempat_ibadah ORDER BY provinsi ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting provinsi:', err);
      return res.status(500).json({ message: 'Gagal mengambil data provinsi' });
    }
    res.json(results.map(row => row.provinsi));
  });
};

exports.getKotabyProvinsi = (req, res) => {
  const { provinsi } = req.query;
  let sql;
  let params = [];

  if (provinsi) {
    sql = 'SELECT DISTINCT kota FROM tempat_ibadah WHERE provinsi = ? ORDER BY kota ASC';
    params = [provinsi];
  } else {
    sql = 'SELECT DISTINCT kota FROM tempat_ibadah ORDER BY kota ASC';
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error getting kota:', err);
      return res.status(500).json({ message: 'Gagal mengambil data kota' });
    }
    res.json(results.map(row => row.kota));
  });
};
