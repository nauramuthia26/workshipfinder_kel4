const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // pending 10 menit tidak dapat masuk
  max: 5, // max 5 percobaan
  message: {
    message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 10 menit.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
