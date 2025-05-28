const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller");

router.get("/", productsController.index);
router.get("/create", productsController.create);
router.post("/", productsController.store);
router.get("/:id", productsController.show);
router.get("/:id/edit", productsController.edit);
router.post("/:id", productsController.update);
router.post("/:id/delete", productsController.destroy); // Assuming a delete method

module.exports = router;
