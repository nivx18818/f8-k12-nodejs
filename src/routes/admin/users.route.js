const express = require("express");
const router = express.Router();

const usersController = require("@/controllers/admin/users.controller");
const usersValidator = require("@/validators/admin/users.validator");

router.get("/", usersController.index);
router.post("/", usersValidator.createUser, usersController.store);
router.get("/create", usersController.create);
router.get("/:id", usersController.show);

module.exports = router;  
