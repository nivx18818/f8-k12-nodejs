const usersService = require("@/services/users.service");
const usersModel = require("@/models/users.model");

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
  await usersService.create({ name, username, email, password });

  res.flash("success", "Account created successfully! Please login.");
  res.redirect("/admin/login");
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  res.flash("info", "You have been logged out successfully.");
  res.redirect("/admin/login");
};
