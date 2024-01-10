const crypto = require("crypto");
const axios = require("axios").default;
const agenda = require("../config/agenda");
const { message, sendRead, statuses } = require("../helpers/whatsapp");

agenda.define("incoming whatsapp messages", async (job) => {
  (async function () {
    try {
      const body = await message(job.attrs.data);
      console.log(body);

      const signatureHash = crypto
        .createHmac("sha256", process.env.KALAM_SECRET)
        .update(JSON.stringify(body))
        .digest("hex");

      axios({
        method: "POST",
        url: "http://localhost:8080/api/v1/webhook",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "X-Hub-Signature-256": `sha256=${signatureHash}`,
        },
      })
        .then((response) => {
          // Handle the response
          console.log(response.data);
          console.log(`response ${response.status} ${response.statusText}`);

          sendRead(body);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  })();
});

agenda.define("incoming whatsapp statuses", async (job) => {
  (async function () {
    try {
      const body = await statuses(job.attrs.data);
      console.log(`body from job: ${body}`);

      // const signatureHash = crypto
      //   .createHmac("sha256", process.env.KALAM_SECRET)
      //   .update(JSON.stringify(body))
      //   .digest("hex");

      // axios({
      //   method: "POST",
      //   url: "http://localhost:8080/api/v1/webhook",
      //   data: JSON.stringify(body),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-Hub-Signature-256": `sha256=${signatureHash}`,
      //   },
      // })
      //   .then((response) => {
      //     // Handle the response
      //     console.log(response.data);
      //     console.log(`response ${response.status} ${response.statusText}`);
      //   })
      //   .catch((error) => {
      //     // Handle the error
      //     console.error(error);
      //   });
    } catch (err) {
      console.error(err);
    }
  })();
});
