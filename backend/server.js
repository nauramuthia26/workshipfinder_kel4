const express = require('express');
const cors = require('cors');
const app = express();
const filterRoutes = require('./routes/filterRoutes');
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require('./routes/users');  
const tempatIbadahRoutes = require('./routes/tempatIbadah');  
const jadwalIbadahRoutes = require('./routes/jadwalIbadah');
const fasilitasRoutes = require('./routes/fasilitas');
const ulasanRoutes = require('./routes/ulasan');
const tempatIbadahRequestRoutes = require('./routes/tempatIbadahRequest');
const tempatIbadahApprovalRoutes = require('./routes/tempatIbadahApproval');

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
app.use('/tempatIbadahRequest', tempatIbadahRequestRoutes);
app.use('/tempatIbadahApproval', tempatIbadahApprovalRoutes);
app.use('/auth', authRoutes);
app.use('/filter', filterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
