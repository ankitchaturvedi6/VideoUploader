const { validationResult } = require("express-validator");

const User = require("../models/user");
const ResetToken = require("../models/reset-token");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

class AuthController {
  static getLoginAction(req, res, next) {
    const VIEW_PATH = "auth/login";
    const errors = req.flash("error");
    const message = errors.length ? errors[0] : null;
    res.render(VIEW_PATH, { message: message });
  }

  static async postLoginAction(req, res, next) {
    const SUCCESS_URL = "/videos";
    const Error_URL = "/login";
    const errorMessage = "Email or Password is not valid";
    try {
      // req.body.password = await bcrypt.hash(req.body.password);
      const result = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!result) {
        req.flash("error", errorMessage);
        return res.redirect(Error_URL);
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        result.dataValues.password
      );

      if (validPassword) {
        req.session.uid = result.dataValues.id;
        return res.redirect(SUCCESS_URL);
      } else {
        req.flash("error", errorMessage);
        return res.redirect(Error_URL);
      }
    } catch (error) {
      // res.flash("error", error);
      console.log(error);
    }
  }

  static getSignupAction(req, res, next) {
    const VIEW_PATH = "auth/signup";
    const errors = req.flash("error");
    const message = errors.length ? errors[0] : null;

    const userInputs = errors.map((error) => {
      return { param: error.param, value: error.value };
    });
    res.render(VIEW_PATH, { message: message, userInputs });
  }

  static async postSignupAction(req, res, next) {
    const errors = validationResult(req).errors;
    if (errors.length) {
      req.flash("error", errors);
      return res.redirect("/signup");
    }
    try {
      const salt = await bcrypt;
      req.body.password = await bcrypt.hash(req.body.password, salt);
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      return res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }

  static getForgotAction(req, res) {
    res.render("auth/forgot");
  }

  static async postForgotAction(req, res) {
    const errors = validationResult(req).errors;

    if (errors.length) {
      return res.redirect("/login");
    }
  }
}

module.exports = AuthController;
