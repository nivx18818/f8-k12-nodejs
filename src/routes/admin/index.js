const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard.route");
const postsRouter = require("./posts.route");
const usersRouter = require("./users.route");
const authRouter = require("./auth.route"); // Added auth router
const productsRouter = require("./products.route"); // Added products router
const commentsRouter = require("./comments.route"); // Added comments router
const topicsRouter = require("./topics.route"); // Added topics router
const settingsRouter = require("./settings.route"); // Added settings router
const analyticsRouter = require("./analytics.route"); // Added analytics router
const categoriesRouter = require("./categories.route"); // Added categories router

router.use("/", dashboardRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/", authRouter); // Mount auth routes at /admin
router.use("/products", productsRouter);
router.use("/comments", commentsRouter);
router.use("/topics", topicsRouter);
router.use("/settings", settingsRouter);
router.use("/analytics", analyticsRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
