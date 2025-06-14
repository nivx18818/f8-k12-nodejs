const db = require("@/config/db");

exports.findAll = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

exports.findById = async (id) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return users[0];
};

exports.findByEmail = async (email) => {
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return users[0];
};

exports.findByEmailAndPassword = async (email, password) => {
  const [users] = await db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
  return users[0];
};

exports.create = async (newUser) => {
  const [result] = await db.query("INSERT INTO users SET ?", [newUser]);
  return { ...newUser, id: result.insertId };
};

exports.update = async (id, data) => {
  await db.query("UPDATE users SET ? WHERE id = ?", [data, id]);
  const updatedUser = await this.findById(id);
  return updatedUser;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
