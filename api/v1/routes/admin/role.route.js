const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/role.controller")
const middleware = require("../../middlewares/admin/role.middleware")

router.get("/", middleware.view, controller.index);

router.post("/create", middleware.create, controller.create);

router.patch("/edit/:id", middleware.edit, controller.edit);

module.exports = router;