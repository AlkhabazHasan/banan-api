const crypto = require("crypto");
const axios = require("axios").default;
const agenda = require("../config/agenda");
require("../jobs/webhook");

function get(req, res) {}

function post(req, res) {
  const body = JSON.parse(req.body);

  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +
      process.env.PHONE_NUMBER_ID +
      "/messages?access_token=" +
      process.env.WHATSAPP_TOKEN,
    data: {
      messaging_product: "whatsapp",
      to: "+97333181898",
      text: { body: body.payload },
    },
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    // Handle the res
    (async function () {
      try {
        await agenda.now("outgoing whatsapp messages", res.data, process.env.PHONE_NUMBER_ID);
      } catch (err) {
        console.error(err);
      }
    })();
    console.log(res.data);
    console.log(`response ${res.status} ${res.statusText}`);
  });

  return res.status(200).json({ message: "success" });
}

module.exports = {
  get,
  post,
};
