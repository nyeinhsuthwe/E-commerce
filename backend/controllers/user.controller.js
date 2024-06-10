const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");

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
      res.cookie("accessToken", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
      });

      res.status(201).json({
        status: "success",
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
      res.cookie("accessToken", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
      });

      res.status(201).json({
        status: "success",
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
  authMiddleware: async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        throw new Error("You're not logged in! Please login to get access.");
      }

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      //check if the user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new Error("The user belonging to this token does not exist.")
        );
      }
      req.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  },
  getMe: async (req, res, next) => {
    req.params.id = req.user.id;
    next();
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(201).json({
        status: "success",
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
};

module.exports = userController;
