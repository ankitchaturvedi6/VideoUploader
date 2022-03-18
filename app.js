require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectFlash = require("connect-flash");
const database = require("./utils/Database");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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
const flash = require("connect-flash/lib/flash");

app.use(authRouter);

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
