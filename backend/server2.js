const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Kontak = require('./models/kontak'); // Import schema

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/worshipfinder_kel4', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Terhubung ke MongoDB'))
.catch((err) => console.error('Gagal konek MongoDB:', err));

// Endpoint POST
app.post('/api/kontak', async (req, res) => {
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});





const Ulasan = require('./models/ulasan'); // Import model ulasan

// Endpoint POST untuk menyimpan ulasan
app.post('/api/ulasan', async (req, res) => {
  try {
    const { nama, ulasan, rating, masjid } = req.body;

    const newUlasan = new Ulasan({ nama, ulasan, rating, masjid });
    await newUlasan.save();

    res.send('Ulasan berhasil disimpan!');
  } catch (err) {
    console.error('Gagal menyimpan ulasan:', err);
    res.status(500).send('Terjadi kesalahan saat menyimpan ulasan.');
  }
});
