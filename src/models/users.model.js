const db = require("@/configs/db");

exports.findAll = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

exports.findById = async (id) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return users[0];
};
