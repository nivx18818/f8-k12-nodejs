const postsModel = require("@/models/posts.model");

exports.findAll = async (page = 1, limit = 10) => {
  const posts = await postsModel.queryAll(page, limit);
  return posts;
};

exports.findById = async (id) => {
  const posts = await this.findAll();
  const post = posts.find((prod) => prod.id === Number(id));
  return post;
};

exports.create = async (data) => {
  const posts = await this.findAll();
  const newId = (posts.at(-1)?.id ?? 0) + 1;

  const newPost = {
    id: newId,
    title: data.title,
    body: data.body,
  };

  const newPosts = [...posts, newPost];
  await writeResource(newPosts);

  return newPost;
};

exports.update = async (id, data) => {
  const posts = await this.findAll();
  const postIndex = posts.findIndex((prod) => prod.id === Number(id));

  if (postIndex === -1) {
    return null;
  }

  const updatedPost = { ...posts[postIndex], ...data };
  const updatedPosts = [
    ...posts.slice(0, postIndex),
    updatedPost,
    ...posts.slice(postIndex + 1),
  ];

  await writeResource(updatedPosts);
  return updatedPost;
};

exports.delete = async (id) => {
  const posts = await this.findAll();
  const updatedPosts = posts.filter((prod) => prod.id !== Number(id));

  if (updatedPosts.length === posts.length) {
    return null;
  }

  await writeResource(updatedPosts);
  return updatedPosts;
};
