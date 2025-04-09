const express = require("express");
const router = express.Router();
const db = require('../config/db');

// ✅ CREATE Approval
router.post("/", (req, res) => {
  const { request_id, id_user, status_verif } = req.body; // Sesuaikan dengan nama kolom di tabel
  const sql = `INSERT INTO Tempat_Ibadah_Approval (request_id, id_user, status_verif) VALUES (?, ?, ?);`;

  db.query(sql, [request_id, id_user, status_verif], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Approval ditambahkan", approvalId: result.insertId });
  });
});

// ✅ READ Semua Approval
router.get("/", (req, res) => {
  db.query("SELECT * FROM Tempat_Ibadah_Approval", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ READ Approval Berdasarkan approval_id
router.get("/:approval_id", (req, res) => {
  const { approval_id } = req.params;
  const sql = "SELECT * FROM Tempat_Ibadah_Approval WHERE approval_id=?";

  db.query(sql, [approval_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ✅ UPDATE Status Approval
router.put("/:approval_id", (req, res) => {
  const { approval_id } = req.params;
  const { status_verif } = req.body;
  const sql = `UPDATE Tempat_Ibadah_Approval SET status_verif=? WHERE approval_id=?`;

  db.query(sql, [status_verif, approval_id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Status approval diperbarui" });
  });
});

// ✅ DELETE Approval
router.delete("/:approval_id", (req, res) => {
  const { approval_id } = req.params;
  const sql = "DELETE FROM Tempat_Ibadah_Approval WHERE approval_id=?";

  db.query(sql, [approval_id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Approval dihapus" });
  });
});

module.exports = router;
