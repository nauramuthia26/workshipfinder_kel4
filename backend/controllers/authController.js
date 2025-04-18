const jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const googleUser = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    const { email, name } = googleUser.data;

    // Cek apakah user sudah ada
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      if (result.length === 0) {
        // User belum ada, insert ke DB
        db.query("INSERT INTO users (nama_user, email, password) VALUES (?, ?, ?)", [name, email, null], (err2, insertResult) => {
          if (err2) return res.status(500).json({ message: "Insert error", error: err2 });

          const user = { id: insertResult.insertId, email };
          const jwtToken = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });
          res.json({ token: jwtToken });
        });
      } else {
        // User sudah ada, login biasa
        const user = { id: result[0].id_user, email };
        const jwtToken = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });
        res.json({ token: jwtToken });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token Google tidak valid" });
  }
};
