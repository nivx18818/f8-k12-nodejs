const express = require("express");
const router = express.Router();

const authController = require("@/controllers/admin/auth.controller");

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;
