const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/api/posts.controller");
const commentsController = require("@/controllers/api/comments.controller");
const postsValidator = require("@/validators/api/posts.validator");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");

attachResourceLoaders(router, "posts");

router.get("/", postsController.getList);
router.get("/:id", postsController.getById);
router.post("/", postsValidator.create, postsController.create);
router.put("/:id", postsValidator.update, postsController.update);
router.patch("/:id", postsValidator.update, postsController.update);
router.delete("/:id", postsController.delete);

router.get("/:id/comments", commentsController.getByPostId);
router.post("/:id/comments", commentsController.createByPostId);

module.exports = router;
