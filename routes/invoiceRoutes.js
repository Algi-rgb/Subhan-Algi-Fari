const express = require("express");
const router = express.Router();
const controller = require("../controllers/invoiceController");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/store", controller.store);
router.get("/delete/:id", controller.delete);

module.exports = router;