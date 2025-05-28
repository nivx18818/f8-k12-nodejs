// Admin Settings Controller

// Display the main settings page
exports.index = (req, res) => {
  res.render("admin/settings/index");
};

// Display the account settings page
exports.accountSettings = (req, res) => {
  res.render("admin/settings/account");
};
