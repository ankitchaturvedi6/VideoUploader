const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const Setting = require("../models/setting");
const Video = require("../models/video");

class VideoController {
  static async getHomeAction(req, res) {
    try {
      res.render("index");
    } catch (error) {}
  }

  static async getVideoUploadAction(req, res) {
    try {
      const videoTypesCount = await Setting.fetchVideoTypes();
      let options = null;
      if (videoTypesCount) {
        options = await Setting.fetchAll();
      }
      res.render("video-upload", { params: options });
    } catch (error) {}
  }

  static async postVideoUploadAction(req, res) {
    try {
      const type = req.body["video-option"];

      if (
        (type == "computer" && !req.file) ||
        (type != "computer" && !req.body["video-url"])
      ) {
        req.flash("error", "Fields Can't Be empty");
        return res.redirect("/videos/video-upload");
      }

      const params = {
        userId: req.session.uid,
        title: req.body.title,
        destination: req.body["video-url"],
        type: req.body["video-option"],
      };

      if (req.file) {
        params["fileName"] = req.file.filename;
        params["destination"] = req.file.path;
      }

      await Video.insert(params);
      res.redirect("/videos");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = VideoController;
