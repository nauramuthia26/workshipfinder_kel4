const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");

router.post("/", fotoController.uploadFoto);
router.get("/", fotoController.getAllFoto);
router.get("/:id", fotoController.getFotoById);
router.delete("/:id", fotoController.deleteFoto);

module.exports = router;
