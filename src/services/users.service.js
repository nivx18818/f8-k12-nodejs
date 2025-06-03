const usersModel = require("@/models/users.model");

exports.getAll = async () => {
  const users = await usersModel.findAll();
  return users;
};

exports.getById = async (id) => {
  const user = await usersModel.findById(id);
  return user;
};

exports.create = async (data) => {
  const newUser = await usersModel.create(data);
  return newUser;
};

exports.update = async (id, data) => {
  const updatedUser = await usersModel.update(id, data);
  return updatedUser;
};

exports.delete = async (id) => {
  const deleted = await usersModel.delete(id);
  return deleted;
};
