const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard.route");
const postsRouter = require("./posts.route");

router.use("/", dashboardRouter);
router.use("/posts", postsRouter);

module.exports = router;
