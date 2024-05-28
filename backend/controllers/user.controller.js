const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userController = {
  login: (req, res) => {
    return res.json({ msg: "user login" });
  },

  register: async (req, res) => {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmed: req.body.passwordConfirmed,
        role: req.body.role,
      });

      const token = generateToken(newUser._id);

      res.status(201).json({
        status: "success",
        token,
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};

module.exports = userController;
