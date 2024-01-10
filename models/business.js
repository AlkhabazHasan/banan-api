// Import required modules
const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

// Define the WhatsaApp Schema
const BusinessSchema = new mongoose.Schema(
  {
    businessId: {
      type: String,
      maxLength: 32,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    cr: {
      type: String,
      trim: true,
    },
    address: {
      building: { type: String, trim: true },
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    contacts: [Number],
  },
  { timestamps: true, versionKey: false }
);

BusinessSchema.pre("save", function (next) {
  const nanoid = customAlphabet(`${process.env.NANOID}`, 27);
  this.businessId = `businessId.${nanoid()}`;
  return next();
});

BusinessSchema.methods = {
  toJSON() {
    return {
      businessId: this.businessId,
      name: this.name,
      cr: this.cr,
      address: {
        building: this.address.building,
        street: this.address.street,
        city: this.address.city,
        country: this.address.country,
      },
      contacts: this.contacts,
    };
  },
};

// Export the WhatsaApp model
module.exports = mongoose.model("Business", BusinessSchema);
