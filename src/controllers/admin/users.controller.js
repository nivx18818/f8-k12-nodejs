const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const users = await usersService.findAll();
  console.log(users);
  res.render("admin/users/index", {
    title: "Users list",
    users,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.findById(req.params.id);
  res.render("admin/users/show", {
    title: "User detail",
    user,
  });
};
