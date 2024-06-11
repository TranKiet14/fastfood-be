const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controllers/admin/food-category.controller")
const middleware = require("../../middlewares/admin/food-category.middleware")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer();

router.get("/", middleware.view, controller.index);

router.post("/create", middleware.create, upload.single("thumbnail"), uploadCloud.upload, controller.create);

router.patch("/edit/:id", middleware.edit, upload.single("thumbnail"), uploadCloud.upload, controller.edit);

router.patch("/delete/:id", middleware.delete, controller.delete);

router.patch("/change-status/:id", middleware.edit, controller.changeStatus);

router.patch("/change-multi", middleware.edit, controller.changeMulti);

module.exports = router;