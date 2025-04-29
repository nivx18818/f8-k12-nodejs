const express = require("express");
const { readDb, writeDb } = require("../utils/db");
const router = express.Router();

const RESOURCE = "comments";
const readResource = readDb(RESOURCE);
const writeResource = writeDb(RESOURCE);

router.get("/", async (req, res) => {
  const comments = await readResource([]);
  res.status(200).json({
    status: "success",
    data: comments,
  });
});

router.get("/:id", async (req, res) => {
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
});

router.post("/", async (req, res) => {
  const comments = await readResource([]);
  const newId = (comments[comments.length - 1]?.id ?? 0) + 1;

  const newComment = {
    id: newId,
    body: req.body.body,
  };

  const newComments = [...comments, newComment];
  await writeResource(newComments);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
});

router.put("/:id", async (req, res) => {
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

  const updatedComment = {
    ...comments[commentIndex],
    name: req.body.name,
  };

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
});

router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
