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
  const users = await this.getAll();
  const newId = (users.at(-1)?.id ?? 0) + 1;

  const newUser = {
    id: newId,
    title: data.title,
    body: data.body,
  };

  const newUsers = [...users, newUser];
  await writeResource(newUsers);

  return newUser;
};

exports.update = async (id, data) => {
  const users = await this.getAll();
  const userIndex = users.findIndex((prod) => prod.id === Number(id));

  if (userIndex === -1) {
    return null;
  }

  const updatedUser = { ...users[userIndex], ...data };
  const updatedUsers = [
    ...users.slice(0, userIndex),
    updatedUser,
    ...users.slice(userIndex + 1),
  ];

  await writeResource(updatedUsers);
  return updatedUser;
};

exports.delete = async (id) => {
  const users = await this.getAll();
  const updatedUsers = users.filter((prod) => prod.id !== Number(id));

  if (updatedUsers.length === users.length) {
    return null;
  }

  await writeResource(updatedUsers);
  return updatedUsers;
};
