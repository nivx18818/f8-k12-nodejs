const usersService = require("@/services/users.service");
const usersModel = require("@/models/users.model");
const jwt = require("@/utils/jwt");
const transporter = require("@/config/mailer");

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

  const token = jwt.createToken({ userId: user.id });
  const verificationUrl = `${req.protocol}://${req.host}/admin/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER_SAMPLE, // user.email
    subject: `Email Verification for ${user.name}`,
    html: `
      <h1>Welcome to Our Platform, ${user.name}!</h1>
      <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>If you did not register, please ignore this email.</p>
      <p>Best regards,</p>
      <p>F8 Team</p>
    `,
  });

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
