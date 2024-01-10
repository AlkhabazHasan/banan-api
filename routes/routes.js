// Require all routes
var index = require("./index");
var whatsApp = require("./whatsapp");
var webhook = require("./webhook");
var business = require("./business");
var account = require("./account");
var user = require("./user");

module.exports = function (app) {
  // Routes
  app.use("/", index);
  app.use("/whatsapp", whatsApp);
  app.use("/webhook", webhook);
  app.use("/business", business);
  app.use("/account", account);
  app.use("/user", user);
};
