const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const users = await usersService.findAll();
  res.render("admin/dashboard/index", {
    title: "Users list",
    users,
  });
};
