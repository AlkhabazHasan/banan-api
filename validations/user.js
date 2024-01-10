const Joi = require("joi");

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordReg).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
});

module.exports = {
  passwordReg,
  signup,
};

