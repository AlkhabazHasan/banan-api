const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const accountController = require("../controllers/account");

router.use(bodyParser.json());
router.get("/", accountController.show);
router.post("/", accountController.create);

module.exports = router;