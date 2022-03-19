require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const connectFlash = require("connect-flash");
const fs = require("fs");
const database = require("./utils/Database");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join("public", "videos");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
app.use(
  multer({
    storage: storage,
  }).single("file-computer")
);

app.use(cookieParse());
app.use(
  session({
    secret: "Some Secret Text",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(connectFlash());

const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const videoRouter = require("./router/video");
const flash = require("connect-flash/lib/flash");

app.use(authRouter);

app.use("/admin", adminRouter);
app.use("/videos", videoRouter);

app.use("/", (req, res) => {
  res.redirect("/videos");
});

database
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listing at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
