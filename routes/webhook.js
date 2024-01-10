const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const crypto = require("crypto");

const webhook = require("../controllers/webhook");

router.use(
  bodyParser.raw({
    inflate: true,
    type: "application/*",
  })
);

router.get("/", webhook.get);
router.post("/", webhook.post);

module.exports = router;
