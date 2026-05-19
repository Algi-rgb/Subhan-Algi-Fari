const express = require("express");
const router = express.Router();

const controller = require("../controllers/pesananController");

/* ================= INDEX ================= */
router.get("/", controller.index);

/* ================= CREATE ================= */
router.get("/create", controller.create);

/* ================= STORE ================= */
router.post("/store", controller.store);

/* ================= EDIT ================= */
router.get("/edit/:id", controller.edit);

/* ================= UPDATE ================= */
router.post("/update/:id", controller.update);

/* ================= DELETE ================= */
router.get("/delete/:id", controller.delete);

module.exports = router;