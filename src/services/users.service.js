const usersModel = require("@/models/users.model");

exports.findUsers = async () => {
  const users = await usersModel.findUsers();
  return users;
};

exports.findUserById = async (id) => {
  const users = await this.findUsers();
  const user = users.find((prod) => prod.id === Number(id));
  return user;
};

exports.addUser = async (data) => {
  const users = await this.findUsers();
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
  const users = await this.findUsers();
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

exports.deleteUser = async (id) => {
  const users = await this.findUsers();
  const updatedUsers = users.filter((prod) => prod.id !== Number(id));

  if (updatedUsers.length === users.length) {
    return null;
  }

  await writeResource(updatedUsers);
  return updatedUsers;
};
