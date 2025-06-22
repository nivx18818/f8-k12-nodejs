const postsService = require("@/services/posts.service");
const response = require("@/utils/response");
const { throw404 } = require("@/utils/throwError");

exports.getList = async (req, res) => {
  const { page, limit } = req.query;
  const posts = await postsService.getAll(page, limit);
  return response.success(res, 200, posts);
};

exports.getById = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  if (!post) throw404();
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
