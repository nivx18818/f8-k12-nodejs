const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "comments";
const readResource = readDb(RESOURCE, []);
const writeResource = writeDb(RESOURCE);

exports.getAll = async () => {
  const comments = await readResource();
  return comments;
};

exports.getByPostId = async (postId) => {
  const comments = await this.getAll();
  const commentsByPostId = comments.filter(
    (comment) => comment.postId === Number(postId)
  );
  return commentsByPostId;
};

exports.getById = async (id) => {
  const comments = await this.getAll();
  const comment = comments.find((prod) => prod.id === Number(id));
  return comment;
};

exports.create = async (data) => {
  const comments = await this.getAll();
  const newId = (comments.at(-1)?.id ?? 0) + 1;

  const newComment = {
    id: newId,
    postId: data.postId,
    name: data.name,
    body: data.body,
  };

  const newComments = [...comments, newComment];
  await writeResource(newComments);

  return newComment;
};

exports.createByPostId = async (data) => {
  const comments = await this.getAll();
  const newId = (comments.at(-1)?.id ?? 0) + 1;

  const newComment = {
    id: newId,
    postId: data.postId,
    name: data.name,
    body: data.body,
  };

  const newComments = [...comments, newComment];
  await writeResource(newComments);

  return newComment;
};

exports.update = async (id, data) => {
  const comments = await this.getAll();
  const commentIndex = comments.findIndex((prod) => prod.id === Number(id));

  if (commentIndex === -1) {
    return null;
  }

  const updatedComment = { ...comments[commentIndex], ...data };
  const updatedComments = [
    ...comments.slice(0, commentIndex),
    updatedComment,
    ...comments.slice(commentIndex + 1),
  ];

  await writeResource(updatedComments);
  return updatedComment;
};

exports.delete = async (id) => {
  const comments = await this.getAll();
  const updatedComments = comments.filter((prod) => prod.id !== Number(id));

  if (updatedComments.length === comments.length) {
    return null;
  }

  await writeResource(updatedComments);
  return updatedComments;
};
