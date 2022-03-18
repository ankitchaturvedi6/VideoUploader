const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const rootFilename = require.main.filename;
const rootDir = path.dirname(rootFilename);

const authController = require(path.join(
  rootDir,
  "controllers",
  "AuthController"
));

const validatorHelper = require(path.join(rootDir, "utils", "Validator"));

router.get("/login", authController.getLoginAction);

router.post("/login", authController.postLoginAction);

router.get("/signup", authController.getSignupAction);

router.post(
  "/signup",
  [
    body("username", "Enter a valid username").isLength({ min: 4, max: 15 }),
    validatorHelper.email("email"),
    validatorHelper.password("password"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Not Matched");
      }
      return true;
    }),
  ],
  authController.postSignupAction
);

router.get("/auth/forgot", authController.getForgotAction);

module.exports = router;
