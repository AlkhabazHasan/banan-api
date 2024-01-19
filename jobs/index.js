const { whatsapp } = require("./whatsapp");

const jobs = [whatsapp];

const allJobs = (agenda) => {
  jobs.forEach((job) => job(agenda));
};

module.exports = { allJobs };
