const { readDb, writeDb } = require("../../utils/db");

const RESOURCE = "posts";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.index = async (req, res) => {
  const posts = await readResource();
  res.status(200).json({
    status: "success",
    data: posts,
  });
};

exports.show = async (req, res) => {
  const posts = await readResource();
  const post = posts.find((prod) => prod.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
};

exports.store = async (req, res) => {
  const posts = await readResource();
  const newId = (posts[posts.length - 1]?.id ?? 0) + 1;

  const newPost = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newPosts = [...posts, newPost];
  await writeResource(newPosts);

  res.status(201).json({
    status: "success",
    data: newPost,
  });
};

exports.update = async (req, res) => {
  const posts = await readResource();
  const postIndex = posts.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );

  if (postIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
    });
  }

  const updatedPost = { ...posts[postIndex], ...req.body };

  const updatedPosts = [
    ...posts.slice(0, postIndex),
    updatedPost,
    ...posts.slice(postIndex + 1),
  ];

  await writeResource(updatedPosts);

  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
};

exports.destroy = async (req, res) => {
  const posts = await readResource();
  const postId = Number(req.params.id);
  const updatedPosts = posts.filter((prod) => prod.id !== postId);

  if (updatedPosts.length === posts.length) {
    return res.status(404).json({
      status: "error",
      message: "Post not found",
    });
  }

  await writeResource(updatedPosts);

  res.status(204).send();
};
