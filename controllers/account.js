const Account = require("../models/account");

function show(req, res) {
  res.status(200).json(req.account);
  return next();
}

async function create(req, res) {
  try {
    const account = await Account.create(req.body);
    return res.status(201).json(account);
  } catch (e) {
    return res.status(500).json(e);
  }
}

module.exports = {
  show,
  create,
};
