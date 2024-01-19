const crypto = require("crypto");
const axios = require("axios").default;
const agenda = require("../config/agenda");
const { message, sendRead, statuses } = require("../helpers/whatsapp");
const Account = require("../models/account");
const Message = require("../models/message");

const handleIncomingMessages = async (job) => {
  try {
    const body = await message(job.attrs.data);

    console.log(body, null, 2)

    const account = await Account.findOne({
      acId: body.acId,
    }).exec();

    const signatureHash = crypto
      .createHmac("sha256", process.env.KALAM_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");

    const response = await axios.post(
      account.webhookURL,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          "X-Hub-Signature-256": `sha256=${signatureHash}`,
        },
      }
    );

    console.log(`response ${response.status} ${response.statusText}`);

    // console.log(body)

    sendRead(body);
  } catch (error) {
    console.error(error);
  }
};

const handleIncomingStatuses = async (job) => {
  try {
    const body = await statuses(job.attrs.data);

    const account = await Account.findById(body.account).exec();

    const signatureHash = crypto
      .createHmac("sha256", process.env.KALAM_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");

    const response = await axios.post(
      account.statusURL,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          "X-Hub-Signature-256": `sha256=${signatureHash}`,
        },
      }
    );

    console.log(`response ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(error);
  }
};

const handleOutgoingMessages = async (job) => {
  try {
    const body = job.attrs.data;

    const account = await Account.findOne({
      phoneId: body.phoneId,
    }).exec();

    const msg = await Message.create({
      meType: "text",
      bound: "out",
      from: account.phone,
      messageId: body.messages[0].id,
      text: {
        body: body.text.body,
      },
      location: {
        coordinates: [0, 0],
      },
      contact: {
        profile: {
          name: "",
        },
        waId: body.contacts[0].wa_id,
      },
      payload: body,
      account: account.id,
    });

    return msg

  } catch (error) {
    console.error(error);
  }
};

agenda.define("incoming whatsapp messages", handleIncomingMessages);
agenda.define("incoming whatsapp statuses", handleIncomingStatuses);
agenda.define("outgoing whatsapp messages", handleOutgoingMessages);
