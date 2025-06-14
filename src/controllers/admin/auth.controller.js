const usersService = require("@/services/users.service");
const usersModel = require("@/models/users.model");
const jwt = require("@/utils/jwt");
const queue = require("@/utils/queue");

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login");
};

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register");
};

exports.showForgotPasswordForm = async (req, res) => {
  res.render("admin/auth/forgot-password");
};

exports.showResetPasswordForm = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.flash("error", "Password reset token is missing.");
    return res.redirect("/admin/login");
  }

  const verification = jwt.verifyToken(token);
  if (!verification.success) {
    res.flash("error", "Invalid or expired password reset token.");
    return res.redirect("/admin/forgot-password");
  }

  res.render("admin/auth/reset-password", { token });
};

exports.login = async (req, res) => {
  const user = await usersModel.findByEmailAndPassword(
    req.body.email,
    req.body.password
  );

  if (user) {
    req.session.userId = user.id;
    res.flash("success", "Welcome back! You have successfully logged in.");
    return res.redirect("/admin/");
  }

  res.flash("error", "Invalid email or password.");
  return res.redirect("/admin/login");
};

exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;
  const user = await usersService.create({ name, username, email, password });

  queue.dispatch("sendVerificationEmail", { userId: user.id });

  res.flash(
    "success",
    "Registration successful! Please check your email to verify your account."
  );
  res.redirect("/admin/login");
};

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const verification = jwt.verifyToken(token);

  if (!verification.success) {
    res.flash("error", "Invalid or expired verification token.");
    return res.redirect("/admin/login");
  }

  const userId = verification.data.userId;
  const user = await usersService.getById(userId);

  if (user.verified_at) {
    res.flash("info", "Your email is already verified.");
    return res.redirect("/admin/login");
  }

  await usersService.update(userId, { verified_at: new Date() });
  res.flash("success", "Your email has been verified successfully.");
  res.redirect("/admin/login");
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  res.flash("info", "You have been logged out successfully.");
  res.redirect("/admin/login");
};

exports.forgotPassword = async (req, res) => {
  const user = await usersService.getByEmail(req.body.email);

  if (!user) {
    res.flash("error", "No user found with that email address.");
    return res.redirect("/admin/forgot-password");
  }

  queue.dispatch("sendPasswordResetEmail", { userId: user.id });

  res.flash("success", "A password reset link has been sent.");
  res.redirect("/admin/login");
};

exports.resetPassword = async (req, res) => {
  const token = req.query.token;
  const verification = jwt.verifyToken(token);

  if (!verification.success) {
    res.flash("error", "Invalid or expired password reset token.");
    return res.redirect("/admin/login");
  }

  const userId = verification.data.userId;
  await usersService.update(userId, { password: req.body.password });

  queue.dispatch("sendPasswordChangedNotification", { userId });

  res.flash("success", "Your password has been reset successfully.");
  res.redirect("/admin/login");
};
