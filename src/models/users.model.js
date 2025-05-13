const db = require("@/configs/db");

exports.getUsers = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};
