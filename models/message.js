// Import required modules
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const { customAlphabet } = require("nanoid");

// Define the WhatsaApp Schema
const MessageSchema = new Schema(
  {
    meId: {
      type: String,
      maxLength: 32,
      unique: true,
      trim: true,
    },
    meType: {
      type: String,
      required: [true, "Type is required!"],
      trim: true,
    },
    bound: {
      type: String,
      enum: ["in", "out"]
    },
    from: {
      type: String,
      required: [true, "From number is required!"],
      trim: true,
    },
    messageId: {
      type: String,
      required: [true, "ID is required!"],
      trim: true,
    },
    text: {
      body: {
        type: String,
        trim: true,
      },
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    contact: {
      profile: {
        name: {
          type: String,
          trim: true,
        },
      },
      waId: {
        type: String,
        trim: true,
      },
    },
    payload: {
      type: JSON,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { versionKey: false, timestamps: true }
);

MessageSchema.pre("save", function (next) {
  const nanoid = customAlphabet(`${process.env.NANOID}`, 27);
  this.meId = `meid.${nanoid()}`;
  return next();
});

// Export the WhatsaApp model
module.exports = mongoose.model("Message", MessageSchema);
