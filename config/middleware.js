const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  // Configuring express app
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  
  // Logger to show requests in the console
  app.use(logger("dev"));
};
