const express = require("express");
const router = express.Router();

// Controller functions (to be created)
const authController = require("../../controllers/admin/auth.controller");

// Admin authentication routes
router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);
router.get("/forgot-password", authController.showForgotForm);
router.post("/forgot-password", authController.sendForgotEmail);
router.get("/reset-password/:token", authController.showResetForm);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/new-password/:token", authController.showNewPasswordForm);
router.post("/new-password/:token", authController.setNewPassword);
router.get("/verify-email", authController.showVerifyNotice);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/verify-email/resend", authController.resendVerifyEmail);
router.post("/logout", authController.logout);

module.exports = router;
