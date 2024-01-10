const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();

const whatsAppController = require("../controllers/whatsapp");

router.use(
  bodyParser.raw({
    inflate: true,
    type: "application/*",
  })
);

router.get("/", whatsAppController.getWhatsApp);
router.post("/", whatsAppController.postWhatsApp);

module.exports = router;
