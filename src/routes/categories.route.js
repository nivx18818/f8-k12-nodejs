const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories.controller");
const categoriesValidator = require("../validators/categories.validator");

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.post("/", categoriesValidator.store, categoriesController.store);
router.put("/:id", categoriesValidator.update, categoriesController.update);
router.patch("/:id", categoriesValidator.update, categoriesController.update);
router.delete("/:id", categoriesController.destroy);

module.exports = router;
