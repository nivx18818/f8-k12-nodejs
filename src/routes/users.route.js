const express = require("express");
const router = express.Router();

const usersController = require("@/controllers/users.controller");
// const usersValidator = require("@/validators/users.validator");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
