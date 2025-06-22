const Post = require("@/models/posts.model");

exports.getAll = async (page = 1, limit = 10) => {
  const posts = await Post.findAll({ limit, offset: (page - 1) * limit });
  return posts;
};

exports.getById = async (id) => {
  const post = await Post.findOne({ where: { id } });
  return post;
};

exports.create = async (data) => {
  const newPost = await Post.create(data);
  return newPost;
};

exports.update = async (id, data) => {
  const updatedRows = await Post.update(data, {
    where: { id },
    returning: true,
  });

  if (!updatedRows) return null;

  const updatedPost = await this.getById(id);
  return updatedPost;
};

exports.delete = async (id) => {
  const deletedRows = await Post.destroy({ where: { id } });
  return deletedRows > 0;
};
