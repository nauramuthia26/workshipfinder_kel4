const express = require("express");
const router = express.Router();
const tempatIbadahController = require("../controllers/tempatIbadahController");

router.post("/", tempatIbadahController.createTempatIbadah);
router.get("/", tempatIbadahController.getAllTempatIbadah);
router.get("/:tempat_id", tempatIbadahController.getTempatIbadahById);
router.put("/:tempat_id", tempatIbadahController.updateTempatIbadah);
router.delete("/:tempat_id", tempatIbadahController.deleteTempatIbadah);

module.exports = router;
