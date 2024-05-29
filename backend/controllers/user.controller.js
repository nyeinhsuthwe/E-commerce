const User = require('../models/user.model');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userController = {
//   login : async (req,res) => {
//     try {
//       let {email, password}= req.body;
//       const user = await User.login(
//         email,
//         password,
//         {role: req.body.role,}
//       );

//       const token = generateToken(user._id);

//       return res.status(201).json({
//         status: "success",
//         token,
//         user
//       });
      
//     } catch (error) {
//       res.status(400).json({
//         status: "fail",
//         message: error.message,
//       });
//     }
// },

  register: async (req, res) => {
    try {
      let {name, email, password, passwordConfirmed}=req.body;

      let salt = await bcrypt.genSalt();
      let hashValue = await bcrypt.hash(password,salt);

      const newUser = await User.create({
        name,
        email,
        password: hashValue,
        passwordConfirmed : hashValue,
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
