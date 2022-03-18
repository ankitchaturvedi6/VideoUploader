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

const isLogged = (req, res, next) => {
  console.log(req.session);
  if (req.session.uid) return res.redirect("/videos");
  next();
};

router.get("/login", isLogged, authController.getLoginAction);

router.post("/login", isLogged, authController.postLoginAction);

router.get("/signup", isLogged, authController.getSignupAction);

router.post(
  "/signup",
  isLogged,
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

router.get("/forgot", isLogged, authController.getForgotAction);

router.post(
  "/forgot",
  isLogged,
  body("email").isEmail().withMessage("Enter a Valid Email"),
  authController.postForgotAction
);

module.exports = router;
