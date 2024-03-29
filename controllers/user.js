const User = require("../models/user");

async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
}

function login(req, res, next) {
  res.status(200).json(req.user);
  return next();
}

module.exports = {
  signUp,
  login,
};
