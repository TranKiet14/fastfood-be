const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/combo.controller")

router.get("/", controller.index);

router.get("/detail/:slugCombo", controller.detail);

router.get("/category/:slugCategory", controller.comboCategory);

module.exports = router;