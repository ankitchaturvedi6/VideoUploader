const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const rootFilename = require.main.filename;
const rootDir = path.dirname(rootFilename);

const videoController = require(path.join(
  rootDir,
  "controllers",
  "VideoController"
));

const isLogged = (req, res, next) => {
  if (!req.session.uid) return res.redirect("/login");
  next();
};

router.get("/", isLogged, videoController.getHomeAction);

router.get("/video-upload", isLogged, videoController.getVideoUploadAction);

router.post("/video-upload", isLogged, videoController.postVideoUploadAction);

module.exports = router;
