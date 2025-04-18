const mongoose = require('mongoose');

const ulasanSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  ulasan: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  masjid: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ulasan', ulasanSchema);
