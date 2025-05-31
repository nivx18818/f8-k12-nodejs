exports.login = async (req, res) => {
  req.session.userId = req.body.id;
}

exports.logout = async (req, res) => {
  delete req.session.userId;
  res.redirect("/admin/login");
};
