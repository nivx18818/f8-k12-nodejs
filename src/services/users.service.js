const usersModel = require("@/models/users.model");

exports.getUsers = async () => {
  const users = await usersModel.getUsers();
  return users;
};

exports.getUserById = async (id) => {
  const users = await this.getUsers();
  const user = users.find((prod) => prod.id === Number(id));
  return user;
};

exports.addUser = async (data) => {
  const users = await this.getUsers();
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

exports.updateUser = async (id, data) => {
  const users = await this.getUsers();
  const userGetUsers = users.findGetUsers((prod) => prod.id === Number(id));

  if (userGetUsers === -1) {
    return null;
  }

  const updatedUser = { ...users[userGetUsers], ...data };
  const updatedUsers = [
    ...users.slice(0, userGetUsers),
    updatedUser,
    ...users.slice(userGetUsers + 1),
  ];

  await writeResource(updatedUsers);
  return updatedUser;
};

exports.deleteUser = async (id) => {
  const users = await this.getUsers();
  const updatedUsers = users.filter((prod) => prod.id !== Number(id));

  if (updatedUsers.length === users.length) {
    return null;
  }

  await writeResource(updatedUsers);
  return updatedUsers;
};
