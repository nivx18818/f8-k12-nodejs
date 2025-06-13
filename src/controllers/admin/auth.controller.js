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
