const db = require("@/configs/db");

exports.findAll = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

exports.findById = async (id) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return users[0];
};

exports.create = async (newUser) => {
  const [result] = await db.query("INSERT INTO users SET ?", [newUser]);
  return { ...newUser, id: result.insertId };
};

exports.update = async (id, updatedUser) => {
  await db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id]);
  return updatedUser;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
