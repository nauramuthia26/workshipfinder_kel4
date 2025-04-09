const express = require('express');
const path = require('path');
const app = express();

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
