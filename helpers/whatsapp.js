const Message = require("../models/message");
const Account = require("../models/account");
const Status = require("../models/status");
const axios = require("axios").default;

async function kind(params) {
  const body = JSON.parse(params);
  const payload = body.entry[0].changes[0].value;

  if (payload.messages) {
    return "messages";
  } else if (payload.statuses) {
    return "statuses";
  }
}

async function message(params) {
  const body = JSON.parse(params);

  const account = await Account.findOne({
    businessId: body.entry[0].id,
  }).exec();

  const payload = body.entry[0].changes[0].value;
  const message = payload.messages[0];
  const contact = payload.contacts[0];

  const msg = await Message.create({
    meType: message.type,
    bound: "in",
    from: message.from,
    messageId: message.id,
    text: {
      body: message.text.body,
    },
    location: {
      coordinates: [0, 0],
    },
    contact: {
      profile: {
        name: contact.profile.name,
      },
      waId: contact.wa_id,
    },
    payload: body,
    account: account.id,
  });

  return {
    acId: account.acId,
    phoneId: account.phoneId,
    message: {
      type: msg.meType,
      id: msg.meId,
      from: msg.from,
      body: msg.text.body,
    },
    contact: {
      waId: msg.contact.waId,
      profile: msg.contact.profile.name,
    },
  };
}

async function statuses(params) {
  const body = JSON.parse(params);

  const account = await Account.findOne({
    businessId: body.entry[0].id,
  }).exec();

  const status = body.entry[0].changes[0].value.statuses[0];

  const message = await Message.findOne({
    messageId: status.id,
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  const stat = await Status.create({
    type: status.status,
    at: status.timestamp,
    recipientId: status.recipient_id,
    message: message,
    payload: body,
    account: account.id,
  });

  return {
    meId: message.meId,
    type: stat.type,
    at: stat.timestamp,
    contact: {
      waId: stat.recipientId,
    },
    account: account.id,
  };
}

async function sendRead(body) {
  let message = await Message.findOne({
    meId: `${body.message.id}`,
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();

  const account = await Account.findOne({
    acId: body.acId,
  }).exec();

  console.log(body);

  axios({
    method: "POST",
    url: `https://graph.facebook.com/v17.0/${body.phoneId}/messages`,
    data: {
      messaging_product: "whatsapp",
      status: "read",
      message_id: `${message.messageId}`,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${account.token}`,
    },
  })
    .then((response) => {
      // Handle the response
      console.log(`response ${response.status} ${response.statusText}`);
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
}

module.exports = { message, sendRead, statuses, kind };
