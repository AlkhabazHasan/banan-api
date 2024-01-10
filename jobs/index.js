const { whatsapp } = require("./whatsapp");
const { webhook } = require("./webhook");

const jobs = [whatsapp, webhook];

const allJobs = (agenda) => {
  jobs.forEach((job) => job(agenda));
};

module.exports = { allJobs };
