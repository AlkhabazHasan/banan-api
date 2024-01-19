const axios = require("axios").default;
const Account = require("../models/account");
const webhook = require("../helpers/webhook");

async function get(req, res) {
  // Add your logic for the GET request here
}

async function post(req, res) {
  try {
    const body = JSON.parse(req.body);

    const account = await Account.findOne({
      acId: body.accountId,
    }).exec();

    const response = await axios.post(
      `https://graph.facebook.com/v15.0/${account.phoneId}/messages?access_token=${account.token}`,
      {
        messaging_product: "whatsapp",
        to: body.recipient,
        text: { body: body.payload },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = {
      phoneId: process.env.PHONE_NUMBER_ID,
      text: { body: body.payload },
    };

    const msg = await webhook.message({ ...data, ...response.data });
    res.status(200).json(msg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Access token or phone ID is not correct" });
  }
}

module.exports = {
  get,
  post,
};
