const express = require("express");
const path = require("path");

const router = express.Router();

const rootFilename = require.main.filename;
const rootDir = path.dirname(rootFilename);

const authController = require(path.join(
  rootDir,
  "controllers",
  "AuthController"
));

router.use("/login", authController.loginAction);

router.use("/signup", authController.signupAction);

module.exports = router;
