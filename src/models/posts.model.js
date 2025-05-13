const db = require("@/configs/db");

exports.queryAll = async (page = 1, limit = 10) => {
  const [posts] = await db.query(`
    SELECT * FROM posts
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}
  `);
  return posts;
};

exports.queryNumberOfPosts = async () => {
  const [{ total }] = await db.query("SELECT COUNT(*) AS total FROM posts");
  return Number(total);
};
