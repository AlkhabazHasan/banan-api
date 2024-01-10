// Import required modules
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { customAlphabet } = require("nanoid");

// Define the WhatsaApp Schema
const StatusSchema = new Schema(
  {
    statusId: {
      type: String,
      maxLength: 32,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
    },
    at: {
      type: Date,
    },
    recipientId: {
      type: String,
    },
    payload: {
      type: JSON,
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { versionKey: false, timestamps: true }
);

StatusSchema.pre("save", function (next) {
  const nanoid = customAlphabet(`${process.env.NANOID}`, 24);
  this.statusId = `statusId.${nanoid()}`;
  return next();
});

// Export the WhatsaApp model
module.exports = mongoose.model("Status", StatusSchema);
