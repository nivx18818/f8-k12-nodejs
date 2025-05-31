const express = require("express");
const router = express.Router();

const commentsController = require("@/controllers/api/comments.controller");
const commentsValidator = require("@/validators/api/comments.validator");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");

attachResourceLoaders(router, "comments");

router.get("/", commentsController.getList);
router.get("/:id", commentsController.getById);
router.post("/", commentsValidator.create, commentsController.create);
router.put("/:id", commentsValidator.update, commentsController.update);
router.patch("/:id", commentsValidator.update, commentsController.update);
router.delete("/:id", commentsController.delete);

module.exports = router;
