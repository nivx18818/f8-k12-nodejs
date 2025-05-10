const express = require("express");
const router = express.Router();

const commentsController = require("@/controllers/comments.controller");
const commentsValidator = require("@/validators/comments.validator");

router.get("/", commentsController.index);
router.get("/:id", commentsController.show);
router.post("/", commentsValidator.store, commentsController.store);
router.put("/:id", commentsValidator.update, commentsController.update);
router.patch("/:id", commentsValidator.update, commentsController.update);
router.delete("/:id", commentsController.destroy);

module.exports = router;
