const db = require("@/configs/db");

exports.queryAll = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};

exports.queryById = async (id) => {
  const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return users[0];
};
