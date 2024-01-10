// Import required modules
const mongoose = require("mongoose");

// Define the WhatsaApp Schema
const SessionSchema = new mongoose.Schema(
  {
    session: { type: Object },
    expires: { type: Date },
  },
  { timestamps: true }
);

// Export the WhatsaApp model
module.exports = mongoose.model("Session", SessionSchema);
