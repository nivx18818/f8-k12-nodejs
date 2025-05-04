const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");
const productsValidator = require("../validators/products.validator")

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", productsValidator.store, productsController.store);
router.put("/:id", productsValidator.update, productsController.update);
router.patch("/:id", productsValidator.update, productsController.update);
router.delete("/:id", productsController.destroy);

module.exports = router;
