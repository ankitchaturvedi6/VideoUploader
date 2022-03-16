require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const authRouter = require("./router/auth");

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Listing at port ${PORT}`);
});
