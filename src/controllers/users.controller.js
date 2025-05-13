const usersService = require("@/services/users.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const throw404 = () => throwError(404, "User not found");

exports.index = async (req, res) => {
  const users = await usersService.findUsers();
  return response.success(res, 200, users);
};

exports.show = async (req, res) => {
  const user = await usersService.findUserById(req.params.id);
  if (!user) throw404();
  return response.success(res, 200, user);
};

exports.store = async (req, res) => {
  const newUser = await usersService.addUser(req.body);
  return response.success(res, 201, newUser);
};

exports.update = async (req, res) => {
  const updatedUser = await usersService.updateUser(req.params.id, req.body);
  if (!updatedUser) throw404();
  return response.success(res, 200, updatedUser);
};

exports.destroy = async (req, res) => {
  const updatedUsers = usersService.deleteUser(req.params.id);
  if (!updatedUsers) throw404();
  return response.success(res, 204);
};
