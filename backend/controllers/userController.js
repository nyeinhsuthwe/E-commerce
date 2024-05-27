const User = require('../models/User');
const mongoose = require('mongoose');

const userController = {
  login: (req, res) => {
    return res.json({ msg: "user login" });
  },

  register: (req, res) => {
    return res.json({ msg: "user signup" });
  },
};

module.exports= userController;
