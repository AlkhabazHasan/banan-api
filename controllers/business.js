const Business = require("../models/business");

async function create(req, res) {
  try {
    const business = await Business.create(req.body);
    return res.status(201).json(business);
  } catch (e) {
    return res.status(500).json(e);
  }
}

function show(req, res, next) {
  res.status(200).json(req.business);
  return next();
}

module.exports = {
  create,
  show,
};
