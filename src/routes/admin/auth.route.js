const express = require("express");
const router = express.Router();

const authController = require("@/controllers/admin/auth.controller");

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);
router.get("/forgot-password", authController.showForgotPasswordForm);
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password", authController.showResetPasswordForm);
router.post("/reset-password", authController.resetPassword);
router.post("/logout", authController.logout);
router.get("/verify-email", authController.verifyEmail);

module.exports = router;
