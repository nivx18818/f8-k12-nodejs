const postsService = require("@/services/posts.service");
const response = require("@/utils/response");

exports.getAll = async (req, res) => {
  const { page, limit } = req.query;
  const { posts } = await postsService.findAll(page, limit);
  return response.success(res, 200, posts);
};

exports.getById = async (req, res) => {
  return response.success(res, 200, req.post);
};

exports.create = async (req, res) => {
  const newPost = await postsService.create(req.body);
  return response.success(res, 201, newPost);
};

exports.update = async (req, res) => {
  const updatedPost = await postsService.update(req.params.id, req.body);
  return response.success(res, 200, updatedPost);
};

exports.delete = async (req, res) => {
  const updatedPosts = postsService.delete(req.params.id);
  return response.success(res, 204);
};
