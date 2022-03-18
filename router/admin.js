const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const rootFilename = require.main.filename;
const rootDir = path.dirname(rootFilename);

const adminController = require(path.join(
  rootDir,
  "controllers",
  "AdminController"
));

// router.get("/settings", adminController.getSettingsAction);

module.exports = router;
