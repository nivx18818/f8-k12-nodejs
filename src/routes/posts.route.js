const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/posts.controller");
const commentsController = require("@/controllers/comments.controller");
const postsValidator = require("@/validators/posts.validator");

router.get("/", postsController.getAll);
router.get("/:id", postsController.getById);
router.post("/", postsValidator.create, postsController.create);
router.put("/:id", postsValidator.update, postsController.update);
router.patch("/:id", postsValidator.update, postsController.update);
router.delete("/:id", postsController.delete);

router.get("/:id/comments", commentsController.getByPostId);
router.post("/:id/comments", commentsController.createByPostId);

module.exports = router;
