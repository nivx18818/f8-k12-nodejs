const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/posts.controller");
const postsValidator = require("@/validators/posts.validator");

router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.post("/", postsValidator.store, postsController.store);
router.put("/:id", postsValidator.update, postsController.update);
router.patch("/:id", postsValidator.update, postsController.update);
router.delete("/:id", postsController.destroy);

module.exports = router;
