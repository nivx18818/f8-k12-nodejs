const express = require("express");
const router = express.Router();

const usersController = require("@/controllers/admin/users.controller");

router.get("/", usersController.index);
router.get("/:id", usersController.show);

module.exports = router;
