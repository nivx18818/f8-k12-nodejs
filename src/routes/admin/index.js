const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const dashboardRouter = require("./dashboard.route");
const postsRouter = require("./posts.route");
const usersRouter = require("./users.route");

router.use("/", authRouter);
router.use("/", dashboardRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);

module.exports = router;
