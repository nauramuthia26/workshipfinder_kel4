const express = require('express');
const path = require('path');
const cors = require("cors");
app.use(cors());
const app = express();

const authRoutes = require('../backend/routes/authRoutes');
const tempatIbadahRoutes = require('../backend/routes/tempatIbadahRoutes');
app.use('/', authRoutes);
app.use('/api', tempatIbadahRoutes);

// Middleware untuk parsing form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('../backend/routes/users');
app.use('/', userRoutes); // menangani POST /register dari HTML

// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});