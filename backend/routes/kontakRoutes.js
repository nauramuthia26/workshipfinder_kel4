const express = require('express');
const router = express.Router();
const Kontak = require('../models/kontak');

// Endpoint POST
router.post('/kontak', async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;
    const newKontak = new Kontak({ nama, email, pesan });
    await newKontak.save();
    res.send('Pesan berhasil dikirim (MongoDB)!');
  } catch (err) {
    console.error('Gagal menyimpan pesan:', err);
    res.status(500).send('Terjadi kesalahan saat menyimpan pesan.');
  }
});

module.exports = router;
