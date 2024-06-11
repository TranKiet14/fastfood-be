const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const controller = require("../../controllers/client/client.controller")

const upload = multer();

router.post("/register", upload.single("avatar"), uploadCloud.upload, controller.register)

router.patch("/edit")

router.post("/login", controller.login)

router.post("/logout")

module.exports = router;