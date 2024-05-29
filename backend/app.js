const morgan = require("morgan");
const express = require("express");
const routes = require("./routes/v1");

const app = express();

console.log("Node Env Variables", process.env.NODE_ENV);

/**
 * 1) Global Middlewares
 */

//Development logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

//Body parser, reading data from body into req.body
app.use(express.json());

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1", routes);

module.exports = app;


// login: async (req, res) => {
//   try {
// <<<<<<< dev
//     const { email, password } = req.body;
//     if (!email || !password) {
//       throw new Error("Please provide email and password!");
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || !(await user.correctPassword(password, user.password))) {
//       throw new Error("Incorrect email or password! Please try again!");
//     }

// =======
//     let {email, password}= req.body;
//     const user = await User.login(
//       email,
//       password,
//       {role: req.body.role,}
//     );

// >>>>>>> main
//     const token = generateToken(user._id);



// <<<<<<< dev
// UserSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
// =======
// UserSchema.statics.login = async function(email,password){
//   let user = await this.findOne({email});
//   if(!user){
//     throw new Error('User does not exist!')
//   }
//   let isCorrect = await bcrypt.compare(password, user.password);
//   if(isCorrect){
//     return user;
//   }else{
//     throw new Error('Password is not match!')
//   }
// }
// >>>>>>> main
