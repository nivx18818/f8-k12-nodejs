const express = require("express");
const router = express.Router();

const todosController = require("../controllers/todos.controller");
const todosValidator = require("../validators/todos.validator")

router.get("/", todosController.index);
router.get("/:id", todosController.show);
router.post("/", todosValidator.store, todosController.store);
router.put("/:id", todosValidator.update, todosController.update);
router.patch("/:id", todosValidator.update, todosController.update);
router.delete("/:id", todosController.destroy);

module.exports = router;
