const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller")
const middlewareAuth = require("../../middlewares/admin/auth.middleware")
const middleware = require("../../middlewares/admin/account.middleware")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer();

router.get("/", middlewareAuth.requireAuth, middleware.view, controller.index)

router.post("/create", middlewareAuth.requireAuth, middleware.create, upload.single("avatar"), uploadCloud.upload, controller.create)

router.patch("/edit/:id", middlewareAuth.requireAuth, middleware.edit, upload.single("avatar"), uploadCloud.upload, controller.edit)

router.patch("/delete/:id", middlewareAuth.requireAuth, middleware.delete, controller.delete)

router.post("/login", controller.login)

router.post("/logout", middlewareAuth.requireAuth, controller.logout)

router.get("/detail", middlewareAuth.requireAuth, controller.detail)

module.exports = router;