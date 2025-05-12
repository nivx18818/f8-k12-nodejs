const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.route");
const commentsRouter = require("./comments.route");
const categoriesRouter = require("./categories.route");
const productsRouter = require("./products.route");
const todosRouter = require("./todos.route");
const usersRouter = require("./users.route");

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/todos", todosRouter);
router.use("/users", usersRouter);

module.exports = router;
