const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

router.get("/", commentsController.index);
router.get("/:id", commentsController.show);
router.post("/", commentsController.store);
router.put("/:id", commentsController.update);
router.patch("/:id", commentsController.update);
router.delete("/:id", commentsController.destroy);

module.exports = router;
