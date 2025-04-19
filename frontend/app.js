const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const kontakRoutes = require('./routes/kontakRoutes');
const cors = require("cors");
const authRoutes = require('../backend/routes/authRoutes');
const tempatIbadahRoutes = require('../backend/routes/tempatIbadahRoutes');
const filterRoutes = require('../backend/routes/filterRoutes');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', authRoutes);
app.use('/api', tempatIbadahRoutes);
app.use('/api', kontakRoutes);

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