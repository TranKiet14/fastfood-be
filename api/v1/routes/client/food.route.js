const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/food.controller")

router.get("/", controller.index);

router.get("/detail/:slugFood", controller.detail);

router.get("/category/:slugCategory", controller.foodCategory);

module.exports = router;