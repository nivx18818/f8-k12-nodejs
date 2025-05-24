const express = require("express");
const router = express.Router();

const commentsController = require("@/controllers/api/comments.controller");
const commentsValidator = require("@/validators/comments.validator");

router.get("/", commentsController.getAll);
router.get("/:id", commentsController.getById);
router.post("/", commentsValidator.create, commentsController.create);
router.put("/:id", commentsValidator.update, commentsController.update);
router.patch("/:id", commentsValidator.update, commentsController.update);
router.delete("/:id", commentsController.delete);

module.exports = router;
