// Admin Auth Controller

// Hiển thị form đăng nhập
exports.showLoginForm = (req, res) => {
  res.render("admin/auth/login");
};

// Xử lý đăng nhập
exports.login = (req, res) => {
  // Logic for handling login
  res.send("Login POST request");
};

// Hiển thị form đăng ký
exports.showRegisterForm = (req, res) => {
  res.render("admin/auth/register");
};

// Xử lý đăng ký
exports.register = (req, res) => {
  // Logic for handling registration
  res.send("Register POST request");
};

// Hiển thị form quên mật khẩu
exports.showForgotForm = (req, res) => {
  res.render("admin/auth/forgot-password");
};

// Xử lý gửi mail reset password
exports.sendForgotEmail = (req, res) => {
  // Logic for sending password reset email
  res.send("Forgot password POST request");
};

// Hiển thị form đặt lại mật khẩu
exports.showResetForm = (req, res) => {
  const { token } = req.params;
  res.render("admin/auth/reset-password", { token });
};

// Xử lý đặt lại mật khẩu
exports.resetPassword = (req, res) => {
  const { token } = req.params;
  // Logic for resetting password
  res.send(`Reset password POST request for token: ${token}`);
};

// Hiển thị form đặt mật khẩu lần đầu
exports.showNewPasswordForm = (req, res) => {
  const { token } = req.params;
  res.render("admin/auth/new-password", { token });
};

// Xử lý đặt mật khẩu lần đầu
exports.setNewPassword = (req, res) => {
  const { token } = req.params;
  // Logic for setting new password
  res.send(`Set new password POST request for token: ${token}`);
};

// Hiển thị thông báo xác thực email
exports.showVerifyNotice = (req, res) => {
  res.render("admin/auth/verify-email");
};

// Xử lý xác thực email
exports.verifyEmail = (req, res) => {
  const { token } = req.params;
  // Logic for verifying email
  res.send(`Verify email GET request for token: ${token}`);
};

// Gửi lại email xác thực
exports.resendVerifyEmail = (req, res) => {
  // Logic for resending verification email
  res.send("Resend verification email POST request");
};

// Đăng xuất
exports.logout = (req, res) => {
  // Logic for logging out
  res.send("Logout POST request");
};
