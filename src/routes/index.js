const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.route");
const commentsRouter = require("./comments.route");
const usersRouter = require("./users.route");

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);

module.exports = router;
