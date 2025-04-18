const mongoose = require('mongoose');

// Ganti URI sesuai koneksi MongoDB kamu
const uri = 'mongodb://localhost:27017/worshipfinder_kel4'; 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Koneksi ke MongoDB berhasil!');
})
.catch((err) => {
  console.error('Koneksi MongoDB gagal:', err);
});

module.exports = mongoose;

