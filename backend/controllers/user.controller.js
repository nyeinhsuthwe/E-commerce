const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userController = {
  

      return res.status(201).json({
        status: "success",
        token,
        user
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
