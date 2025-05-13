const db = require("@/configs/db");

exports.queryAll = async () => {
  const [users] = await db.query("SELECT * FROM users");
  return users;
};
