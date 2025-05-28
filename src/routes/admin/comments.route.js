const express = require("express");
const router = express.Router();
const commentsController = require("../../controllers/admin/comments.controller");

router.get("/", commentsController.index);
router.get("/:id", commentsController.show);
router.get("/:id/edit", commentsController.edit);
router.post("/:id", commentsController.update);
router.post("/:id/delete", commentsController.destroy);

module.exports = router;
