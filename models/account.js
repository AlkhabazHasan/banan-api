// Import required modules
const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

// Define the WhatsaApp Schema
const AccountSchema = new mongoose.Schema(
  {
    acId: {
      type: String,
      maxLength: 32,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Display phone number is required!"],
    },
    phoneId: {
      type: String,
      required: [true, "Phone number ID is required!"],
    },
    businessId: {
      type: String,
      trim: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: true, versionKey: false }
);

AccountSchema.pre("save", function (next) {
  const nanoid = customAlphabet(`${process.env.NANOID}`, 27);
  this.acId = `acid.${nanoid()}`;
  return next();
});

AccountSchema.methods = {
  toJSON() {
    return {
      acId: this.acId,
      phone: this.phone,
      phoneId: this.phoneId,
      businessId: this.businessId,
      business: this.business,
    };
  },
};

// Export the WhatsaApp model
module.exports = mongoose.model("Account", AccountSchema);
