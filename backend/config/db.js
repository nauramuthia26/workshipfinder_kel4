const mysql = require("mysql");

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "",   
    database: "tempat_ibadah", 
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL Database");

    // 🔹 Membuat tabel Users
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            nama_user VARCHAR(200) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            no_tlp VARCHAR(15) NOT NULL,
            password VARCHAR(100) NOT NULL,
            role ENUM('admin', 'user') NOT NULL
        );
    `;

    // 🔹 Membuat tabel Tempat_Ibadah
    const createTempatIbadahTable = `
        CREATE TABLE IF NOT EXISTS Tempat_Ibadah (
            tempat_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            nama_tempat VARCHAR(255) NOT NULL,
            alamat VARCHAR(255) NOT NULL,
            kota VARCHAR(100) NOT NULL,
            provinsi VARCHAR(100) NOT NULL,
            kode_pos VARCHAR(10),
            latitude FLOAT,
            longitude FLOAT,
            agama VARCHAR(50) NOT NULL,
            waktu_operasi VARCHAR(100),
            deskripsi TEXT,
            kontak VARCHAR(50),
            tipologi VARCHAR(100),
            FOREIGN KEY (user_id) REFERENCES Users(id_user) ON DELETE SET NULL
        );
    `;

    // 🔹 Membuat tabel Jadwal_Ibadah 
    const createJadwalIbadahTable = `
        CREATE TABLE IF NOT EXISTS Jadwal_Ibadah (
            jadwal_id INT AUTO_INCREMENT PRIMARY KEY,
            tempat_ibadah_id INT,
            hari VARCHAR(20) NOT NULL,
            waktu TIME NOT NULL,
            keterangan TEXT,
            FOREIGN KEY (tempat_ibadah_id) REFERENCES Tempat_Ibadah(tempat_id) ON DELETE CASCADE
    );
`;

    // 🔹 Membuat tabel Fasilitas 
    const createFasilitasTable= `
    CREATE TABLE IF NOT EXISTS Fasilitas (
        fasilitas_id INT AUTO_INCREMENT PRIMARY KEY,
        tempat_ibadah_id INT,
        nama_fasilitas VARCHAR(255) NOT NULL,
        deskripsi TEXT,
        FOREIGN KEY (tempat_ibadah_id) REFERENCES Tempat_Ibadah(tempat_id) ON DELETE CASCADE
    );
`;

// 🔹 Membuat tabel Ulasan 
    const createUlasanTable = `
    CREATE TABLE IF NOT EXISTS Ulasan (
        ulasan_id INT AUTO_INCREMENT PRIMARY KEY,
        id_user INT,
        tempat_ibadah_id INT,
        tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        komentar TEXT,
        FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE,
        FOREIGN KEY (tempat_ibadah_id) REFERENCES Tempat_Ibadah(tempat_id) ON DELETE CASCADE
    );
`;

// 🔹 Membuat tabel Tempat_Ibadah_Request 
    const createTempatIbadahRequestTable = `
    CREATE TABLE IF NOT EXISTS Tempat_Ibadah_Request (
        request_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        nama_tempat VARCHAR(255) NOT NULL,
        tipologi VARCHAR(100) NOT NULL,
        provinsi VARCHAR(100) NOT NULL,
        kota VARCHAR(100) NOT NULL,
        alamat VARCHAR(255) NOT NULL,
        kapasitas VARCHAR(100) NOT NULL,
        waktu_operasi VARCHAR(100) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id_user) ON DELETE CASCADE
    );
`;

// 🔹 Membuat tabel Tempat_Ibadah_Approval 
    const createTempatIbadahApprovalTable = `
    CREATE TABLE IF NOT EXISTS Tempat_Ibadah_Approval (
        approval_id INT AUTO_INCREMENT PRIMARY KEY,
        id_tempat_request INT,
        user_id INT,
        status_verif ENUM('konfirmasi', 'gagal') NOT NULL,
        FOREIGN KEY (id_tempat_request) REFERENCES Tempat_Ibadah_Request(request_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES Users(id_user) ON DELETE CASCADE
    );
`;

// 🔹 Membuat tabel Foto 
    const createFotoTable = `
    CREATE TABLE IF NOT EXISTS Foto (
    foto_id INT AUTO_INCREMENT PRIMARY KEY,
    tempat_id INT,
    url TEXT NOT NULL,
    FOREIGN KEY (tempat_id) REFERENCES Tempat_Ibadah(tempat_id) ON DELETE CASCADE
    );
`;

// 🔹 Membuat tabel Event
    const createEventTable = `
    CREATE TABLE IF NOT EXISTS Event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    tempat_id INT,
    nama_event VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    FOREIGN KEY (tempat_id) REFERENCES Tempat_Ibadah(tempat_id) ON DELETE CASCADE
    );
`;

    // Eksekusi query untuk membuat tabel
    db.query(createUsersTable, (err, result) => {
        if (err) {
            console.error("Error creating Users table: ", err);
        } else {
            console.log("Users table ready!");
        }
    });

    db.query(createTempatIbadahTable, (err, result) => {
        if (err) {
            console.error("Error creating Tempat_Ibadah table: ", err);
        } else {
            console.log("Tempat_Ibadah table ready!");
        }
    });

    db.query(createJadwalIbadahTable, (err, result) => {
        if (err) {
            console.error("Error creating Jadwal_Ibadah table: ", err);
        } else {
            console.log("Jadwal_Ibadah table ready!");
        }
    });

    db.query(createFasilitasTable, (err, result) => {
        if (err) {
            console.error("Error creating Fasilitas table: ", err);
        } else {
            console.log("Fasilitas table ready!");
        }
    });

    db.query(createUlasanTable, (err, result) => {
        if (err) {
            console.error("Error creating Ulasan table: ", err);
        } else {
            console.log("Ulasan table ready!");
        }
    });

    db.query(createTempatIbadahRequestTable, (err, result) => {
        if (err) {
            console.error("Error creating Tempat_Ibadah_Request table: ", err);
        } else {
            console.log("Tempat_Ibadah_Request table ready!");
        }
    });
    
    db.query(createTempatIbadahApprovalTable, (err, result) => {
        if (err) {
            console.error("Error creating Tempat_Ibadah_Approval table: ", err);
        } else {
            console.log("Tempat_Ibadah_Approval table ready!");
        }
    });

    db.query(createFotoTable, (err, result) => {
        if (err) {
            console.error("Error creating Foto table: ", err);
        } else {
            console.log("Foto table ready!");
        }
    });

    db.query(createEventTable, (err, result) => {
        if (err) {
            console.error("Error creating Event table: ", err);
        } else {
            console.log("Event table ready!");
        }
    });
});



module.exports = db;