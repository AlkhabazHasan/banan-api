const Agenda = require("agenda");
const mongoose = require("mongoose");

const agenda = new Agenda({
  mongo: mongoose.connection,
  collection: "agendaJobs",
});

agenda.start();

module.exports = agenda;
