const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { authLocal } = require("../auth/local");

// router.use(bodyParser.json());

/* GET home page. */
router.get("/", authLocal, function (req, res, next) {
  res.json({
    title: "This is a private route!",
  });
});

module.exports = router;

