const express = require("express");
require("dotenv").config("");
const morgan = require("morgan");
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersAuthentication');

const app = express();
const mongoURL = "mongodb+srv://nhtnht:e123@cluster2.7gdfh6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2"
mongoose.connect(mongoURL).then(()=>{
    console.log('connected to db');
    app.listen(process.env.PORT, () => {
        console.log("app is running on port 8000");
      });
})

app.use(express.json());
app.use(morgan("dev"));
app.use(usersRoutes);

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use('/api/users',usersRoutes)

