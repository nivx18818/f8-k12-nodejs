const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "posts";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.getAll = async () => {
  const posts = await readResource();
  return posts;
};

exports.getById = async (id) => {
  const posts = await this.getAll();
  const post = posts.find((prod) => prod.id === Number(id));
  return post;
};

exports.create = async (data) => {
  const posts = await this.getAll();
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
  const posts = await this.getAll();
  const postGetPosts = posts.findGetPosts((prod) => prod.id === Number(id));

  if (postGetPosts === -1) {
    return null;
  }

  const updatedPost = { ...posts[postGetPosts], ...data };
  const updatedPosts = [
    ...posts.slice(0, postGetPosts),
    updatedPost,
    ...posts.slice(postGetPosts + 1),
  ];

  await writeResource(updatedPosts);
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
