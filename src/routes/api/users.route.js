const express = require("express");
const router = express.Router();

const usersController = require("@/controllers/api/users.controller");
// const usersValidator = require("@/validators/api/users.validator");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");

attachResourceLoaders(router, "users");

router.get("/", usersController.getList);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
