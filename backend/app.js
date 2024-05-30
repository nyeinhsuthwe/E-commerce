const morgan = require("morgan");
const express = require("express");
const routes = require("./routes/v1");
const cors = require('cors')

const app = express();

console.log("Node Env Variables", process.env.NODE_ENV);

/**
 * 1) Global Middlewares
 */


//Development logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

app.use(cors(
  {
      origin : "http://localhost:5173",
      credentials : true
  }
));

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

