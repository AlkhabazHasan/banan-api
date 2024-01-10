// Required modules
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordReg } = require("../validations/user");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      trim: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    firstName: {
      type: String,
      required: [true, "FirstName is required!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "LastName is required!"],
      trim: true,
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "UserName is required!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [6, "Password need to be longer!"],
      validate: {
        validator(password) {
          return passwordReg.test(password);
        },
        message: "{VALUE} is not a valid password!",
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  },

  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },

  //signing token with user id
  createToken() {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
  },

  toJSON() {
    return {
      user: {
        id: this.id,
        email: this.email,
        userName: this.userName,
      },
      message: "Login successfull",
      accessToken: `${this.createToken()}`,
    };
  },
};

UserSchema.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
