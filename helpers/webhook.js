const Message = require("../models/message");
const Account = require("../models/account");

async function message(params) {
  const account = await Account.findOne({
    phoneId: params.phoneId,
  }).exec();

  const msg = await Message.create({
    meType: "text",
    bound: "out",
    from: account.phone,
    messageId: params.messages[0].id,
    text: {
      body: params.text.body,
    },
    location: {
      coordinates: [0, 0],
    },
    contact: {
      profile: {
        name: "",
      },
      waId: params.contacts[0].wa_id,
    },
    payload: params,
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

module.exports = { message };
