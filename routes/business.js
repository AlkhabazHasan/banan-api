const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const businessController = require("../controllers/business");

router.use(bodyParser.json());
router.get("/", businessController.show);
router.post("/", businessController.create);

module.exports = router;