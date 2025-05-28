const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/admin/categories.controller");

router.get("/", categoriesController.index);
router.get("/create", categoriesController.create);
router.post("/", categoriesController.store);
router.get("/:id/edit", categoriesController.edit);
router.post("/:id", categoriesController.update);
router.post("/:id/delete", categoriesController.destroy);

module.exports = router;
