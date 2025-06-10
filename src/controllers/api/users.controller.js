const usersService = require("@/services/users.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");
const transporter = require("@/config/mailer");

const throw404 = () => throwError(404, "User not found");

exports.getList = async (req, res) => {
  const users = await usersService.getAll();
  return response.success(res, 200, users);
};

exports.getById = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (!user) throw404();
  return response.success(res, 200, user);
};

exports.create = async (req, res) => {
  const newUser = await usersService.create(req.body);
  return response.success(res, 201, newUser);
};

exports.update = async (req, res) => {
  const updatedUser = await usersService.update(req.params.id, req.body);
  if (!updatedUser) throw404();
  return response.success(res, 200, updatedUser);
};

exports.delete = async (req, res) => {
  const updatedUsers = usersService.delete(req.params.id);
  if (!updatedUsers) throw404();
  return response.success(res, 204);
};
