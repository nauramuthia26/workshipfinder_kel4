const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Kontak = require('./models/kontak');
const filterRoutes = require('./routes/filterRoutes');
const authRoutes = require("./routes/authRoutes");
const loginRateLimiter = require('./middlewares/loginRateLimiter');
const usersRoutes = require('./routes/users');   
const jadwalIbadahRoutes = require('./routes/jadwalIbadah');
const fasilitasRoutes = require('./routes/fasilitas');
const ulasanRoutes = require('./routes/ulasan');
const tempatIbadahRequestRoutes = require('./routes/tempatIbadahRequest');
const tempatIbadahApprovalRoutes = require('./routes/tempatIbadahApproval');
const tempatIbadahRoutes = require("./routes/tempatIbadahRoutes");
const eventRoutes = require("./routes/eventRoutes");
const fotoRoutes = require("./routes/fotoRoutes");
const kontakRoutes = require('./routes/kontakRoutes');

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
  
  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

// Gunakan route users dan tempat ibadah
app.use('/users', usersRoutes);
app.use('/tempatIbadah', tempatIbadahRoutes);
app.use('/jadwalIbadah', jadwalIbadahRoutes);
app.use('/fasilitas', fasilitasRoutes);
app.use('/ulasan', ulasanRoutes);
app.use('/', authRoutes);
app.use('/tempatIbadahRequest', tempatIbadahRequestRoutes);
app.use('/tempatIbadahApproval', tempatIbadahApprovalRoutes);
app.use('/auth', authRoutes);
app.use("/api/tempat-ibadah", tempatIbadahRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/foto", fotoRoutes);
app.use("/api/event", eventRoutes);
app.use('/api', kontakRoutes);
app.use('/filter', filterRoutes);
app.use('/kontakKami', kontakRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
