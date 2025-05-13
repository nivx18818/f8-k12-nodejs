const postsService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const throw404 = () => throwError(404, "Post not found");

exports.getAll = async (req, res) => {
  const posts = await postsService.findAll();
  return response.success(res, 200, posts);
};

exports.getById = async (req, res) => {
  const post = await postsService.findById(req.params.id);
  if (!post) throw404();
  return response.success(res, 200, post);
};

exports.create = async (req, res) => {
  const newPost = await postsService.create(req.body);
  return response.success(res, 201, newPost);
};

exports.update = async (req, res) => {
  const updatedPost = await postsService.update(req.params.id, req.body);
  if (!updatedPost) throw404();
  return response.success(res, 200, updatedPost);
};

exports.delete = async (req, res) => {
  const updatedPosts = postsService.delete(req.params.id);
  if (!updatedPosts) throw404();
  return response.success(res, 204);
};
