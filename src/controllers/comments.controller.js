const commentsService = require("@/services/comments.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const throw404 = () => throwError(404, "Comment not found");

exports.getAll = async (req, res) => {
  const comments = await commentsService.getAll();
  return response.success(res, 200, comments);
};

exports.getById = async (req, res) => {
  const comment = await commentsService.getById(req.params.id);
  if (!comment) throw404();
  return response.success(res, 200, comment);
};

exports.getByPostId = async (req, res) => {
  const commentsByPostId = await commentsService.getByPostId(req.params.id);
  return response.success(res, 200, commentsByPostId);
};

exports.create = async (req, res) => {
  const newComment = await commentsService.create(req.body);
  return response.success(res, 201, newComment);
};

exports.createByPostId = async (req, res) => {
  const data = { ...req.body, postId: req.params.id };
  const newComment = await commentsService.createByPostId(data);
  return response.success(res, 201, newComment);
};

exports.update = async (req, res) => {
  const updatedComment = await commentsService.update(req.params.id, req.body);
  if (!updatedComment) throw404();
  return response.success(res, 200, updatedComment);
};

exports.delete = async (req, res) => {
  const updatedComments = await commentsService.delete(req.params.id);
  if (!updatedComments) throw404();
  return response.success(res, 204);
};
