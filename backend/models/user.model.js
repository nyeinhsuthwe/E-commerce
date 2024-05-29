const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
  console.log(this.password);
  this.passwordConfirmed = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
