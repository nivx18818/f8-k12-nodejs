const { readDb, writeDb } = require("../../utils/db");

const RESOURCE = "comments";
const readResource = readDb(RESOURCE);
const writeResource = writeDb(RESOURCE);

const index = async (req, res) => {
  const comments = await readResource([]);
  res.status(200).json({
    status: "success",
    data: comments,
  });
};

const show = async (req, res) => {
  const comments = await readResource([]);
  const comment = comments.find((prod) => prod.id === Number(req.params.id));

  if (!comment) {
    return res.status(404).json({
      status: "error",
      message: "Comment not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: comment,
  });
};

const store = async (req, res) => {
  const comments = await readResource([]);
  const newId = (comments[comments.length - 1]?.id ?? 0) + 1;

  const newComment = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newComments = [...comments, newComment];
  await writeResource(newComments);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
};

const update = async (req, res) => {
  const comments = await readResource([]);
  const commentIndex = comments.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );

  if (commentIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Comment not found",
    });
  }

  const updatedComment = { ...comments[commentIndex], ...req.body };

  const updatedComments = [
    ...comments.slice(0, commentIndex),
    updatedComment,
    ...comments.slice(commentIndex + 1),
  ];

  await writeResource(updatedComments);

  res.status(200).json({
    status: "success",
    data: updatedComment,
  });
};

const destroy = async (req, res) => {
  const comments = await readResource([]);
  const commentId = Number(req.params.id);
  const updatedComments = comments.filter((prod) => prod.id !== commentId);

  if (updatedComments.length === comments.length) {
    return res.status(404).json({
      status: "error",
      message: "Comment not found",
    });
  }

  await writeResource(updatedComments);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
