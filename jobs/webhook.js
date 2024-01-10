const crypto = require("crypto");
const axios = require("axios").default;
const agenda = require("../config/agenda");
const { message } = require("../helpers/whatsapp");

agenda.define("outgoing whatsapp messages", async (job) => {
  (async function () {
    try {
        console.log("hello World!")
      const body = job.attrs.data;
      console.log(job.attrs);

      
    } catch (err) {
      console.error(err);
    }
  })();
});
