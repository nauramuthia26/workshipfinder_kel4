const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Terlalu banyak percobaan login. Silakan coba lagi setelah 10 menit.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    console.log("⛔ Rate limit triggered");
    res.status(options.statusCode).json(options.message);
  }
});

module.exports = loginLimiter;
