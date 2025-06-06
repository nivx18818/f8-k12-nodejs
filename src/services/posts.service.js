const postsModel = require("@/models/posts.model");

exports.getAll = async (page = 1, limit = 10) => {
  const posts = await postsModel.findAll(page, limit);
  return posts;
};

exports.getById = async (id) => {
  const post = await postsModel.findById(id);
  return post;
};

exports.create = async (data) => {
  const newPost = await postsModel.create(data);
  return newPost;
};

exports.update = async (id, data) => {
  const post = this.findById(id);

  if (!post) {
    return null;
  }

  const updatedPost = { ...post, ...data };
  await postsModel.update(id, updatedPost);
  return updatedPost;
};

exports.delete = async (id) => {
  const posts = await this.getAll();
  const updatedPosts = posts.filter((prod) => prod.id !== Number(id));

  if (updatedPosts.length === posts.length) {
    return null;
  }

  await writeResource(updatedPosts);
  return updatedPosts;
};
