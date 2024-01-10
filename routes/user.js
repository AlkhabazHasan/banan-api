const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { authLocal } = require("../auth/local");
const { authJwt } = require("../auth/jwt");

const validate = require("express-validation");

const userValidation = require("../validations/user");
const userController = require("../controllers/user");

router.use(bodyParser.json());

router.post("/sign-up", validate(userValidation.signup), userController.signUp);
router.post("/login", authLocal, userController.login);

module.exports = router;
