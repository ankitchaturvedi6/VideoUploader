const { validationResult } = require("express-validator");

const Setting = require("../models/setting");

class AdminController {
  static getSettingsAction(req, res) {
    res.render("admin/settings");
  }

  static async postSettingsAction(req, res) {
    try {
      await Setting.insertAll(req.body);
      res.redirect("/admin/settings");
    } catch (error) {}
  }
}

module.exports = AdminController;
