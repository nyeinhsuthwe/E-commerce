const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Please provide email and password!");
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error("Incorrect email or password! Please try again!");
      }

      const token = generateToken(user._id);

      res.status(201).json({
        status: "success",
        token,
        data: {
          user: user,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const newUser = await User.create(req.body);

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
