const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/users/index", {
    title: "Users list",
    users,
    isDeleting: false,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/show", {
    title: "User detail",
    user,
  });
};

exports.create = async (req, res) => {
  res.render("admin/users/create", {
    errors: {},
    old: {},
  });
};

exports.store = async (req, res) => {
  const { name, username, email, password } = req.body;
  await usersService.create({ name, username, email, password });

  res.setFlash({
    type: "success",
    message: "User created successfully",
  });

  res.redirect("/admin/users");
};

exports.edit = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/edit", {
    title: "Update user",
    errors: {},
    old: user,
  });
};

exports.update = async (req, res) => {
  const { name, old: username, email, password } = req.body;
  await usersService.update(req.params.id, { name, username, email, password });
  res.redirect(`/admin/users/${req.params.id}`);
};

exports.delete = async (req, res) => {
  await usersService.delete(req.params.id);
  res.redirect(`/admin/users`);
};
