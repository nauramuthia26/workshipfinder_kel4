const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_api_codeigniter'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Routes
const userRoutes = require('../../backend/users');
const tempatIbadahRoutes = require('../../backend/tempat_ibadah');
const jadwalIbadahRoutes = require('../../backend/jadwal_ibadah');
const fasilitasRoutes = require('../../backend/fasilitas');
const tempatIbadahRequestRoutes = require('../../backend/tempat_ibadah_request');
const tempatIbadahApprovalRoutes = require('../../backend/tempat_ibadah_approval');
const ulasanRoutes = require('../../backend/ulasan');

app.use('/users', userRoutes);
app.use('/tempat-ibadah', tempatIbadahRoutes);
app.use('/jadwal-ibadah', jadwalIbadahRoutes);
app.use('/fasilitas', fasilitasRoutes);
app.use('/tempat-ibadah-request', tempatIbadahRequestRoutes);
app.use('/tempat-ibadah-approval', tempatIbadahApprovalRoutes);
app.use('/ulasan', ulasanRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
