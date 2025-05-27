const db = require("@/configs/db");

exports.findAll = async (page = 1, limit = 10) => {
  const [posts] = await db.query("SELECT * FROM posts LIMIT ? OFFSET ?", [
    limit,
    (page - 1) * limit,
  ]);
  const total = await this.queryNumberOfPosts();
  return { posts, total };
};

exports.findById = async (id) => {
  const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
  return posts[0];
};

exports.findNumberOfPosts = async () => {
  const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM posts");
  return Number(total);
};

exports.create = async (newPost) => {
  const [result] = await db.query("INSERT INTO posts SET ?", [newPost]);
  return { ...newPost, id: result.insertId };
}

exports.update = async (id, updatedPost) => {
  await db.query("UPDATE posts SET ? WHERE id = ?", [
    updatedPost,
    id,
  ]);
  return updatedPost;
};
