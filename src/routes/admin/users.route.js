const express = require("express");
const router = express.Router();

const usersController = require("@/controllers/admin/users.controller");
const usersValidator = require("@/validators/admin/users.validator");

router.get("/", usersController.index);
router.post("/", usersValidator.create, usersController.store);
router.get("/create", usersController.create);
router.get("/:id", usersController.show);
router.post("/:id", usersValidator.update, usersController.update);
router.get("/:id/edit", usersController.edit);
router.get("/:id/delete", usersController.delete);

module.exports = router;
