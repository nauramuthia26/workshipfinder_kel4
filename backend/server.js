const express = require('express');
const cors = require('cors');
const app = express();

const usersRoutes = require('./routes/users');  
const tempatIbadahRoutes = require('./routes/tempatIbadah');  
const jadwalIbadahRoutes = require('./routes/jadwalIbadah');
const fasilitasRoutes = require('./routes/fasilitas');
const ulasanRoutes = require('./routes/ulasan');
const tempatIbadahRequestRoutes = require('./routes/tempatIbadahRequest');
const tempatIbadahApprovalRoutes = require('./routes/tempatIbadahApproval');
const authRoutes = require('./routes/authRoutes');

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
app.use('/tempatIbadahRequest', tempatIbadahRoutes);
app.use('/tempatIbadahApproval', tempatIbadahApprovalRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
