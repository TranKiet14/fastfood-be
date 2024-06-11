const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/food-category.controller")
const middleware = require("../../middlewares/client/food-category.cache")

router.get("/",middleware.cacheCategories, controller.index);

module.exports = router;