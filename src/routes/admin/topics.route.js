const express = require("express");
const router = express.Router();
const topicsController = require("../../controllers/admin/topics.controller");

router.get("/", topicsController.index);
router.get("/create", topicsController.create);
router.post("/", topicsController.store);
router.get("/:id/edit", topicsController.edit);
router.post("/:id", topicsController.update);
router.post("/:id/delete", topicsController.destroy);

module.exports = router;
