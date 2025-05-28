const express = require("express");
const router = express.Router();
const settingsController = require("../../controllers/admin/settings.controller");

router.get("/", settingsController.index);
router.get("/account", settingsController.accountSettings);
// Add other settings routes here if needed

module.exports = router;
