const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: [true, "This email is already taken!"],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirmed: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordResetExpires: Date,
  passwordResetToken: String,
  passwordChangeAt: Date,
  isActive: {
    type: Boolean,
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
