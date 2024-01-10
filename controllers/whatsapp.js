const crypto = require("crypto");
const agenda = require("../config/agenda");
require("../jobs/whatsapp");
const { kind } = require("../helpers/whatsapp");

function getWhatsApp(req, res) {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function postWhatsApp(req, res) {
  // Check the Incoming webhook message
  const body = Buffer.from(req.body).toString();

  var signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    res.status(400).json({ error: "Bad Request" });
  } else {
    var data = req.body;

    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", process.env.APP_SECRET)
      .update(data)
      .digest("hex");

    if (signatureHash != expectedHash) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      (async function () {
        try {
          if ((await kind(body)) === "messages") {
            await agenda.now("incoming whatsapp messages", body);
          } else if ((await kind(body)) === "statuses") {
            await agenda.now("incoming whatsapp statuses", body);
          }
        } catch (err) {
          console.error(err);
        }
      })();

      res.status(200).json({ message: "OK" });
    }
  }
}

module.exports = {
  getWhatsApp,
  postWhatsApp,
};

// {
//   "object": "whatsapp_business_account",
//   "entry": [
//       {
//           "id": "110628475201160",
//           "changes": [
//               {
//                   "value": {
//                       "messaging_product": "whatsapp",
//                       "metadata": {
//                           "display_phone_number": "15550313093",
//                           "phone_number_id": "111234898472512"
//                       },
//                       "contacts": [
//                           {
//                               "profile": {
//                                   "name": "صـَـفحات لتطوير البرمجيات"
//                               },
//                               "wa_id": "97333181898"
//                           }
//                       ],
//                       "messages": [
//                           {
//                               "from": "97333181898",
//                               "id": "wamid.HBgLOTczMzMxODE4OTgVAgASGBYzRUIwNTVCMzlCMjAxOENBMjk2NjRBAA==",
//                               "timestamp": "1704785107",
//                               "text": {
//                                   "body": "السلام عليكم"
//                               },
//                               "type": "text"
//                           }
//                       ]
//                   },
//                   "field": "messages"
//               }
//           ]
//       }
//   ]
// }
