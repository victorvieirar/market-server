const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Express
const app = express();

// Routes
const api = require("./routes/api");

// Server and Socket
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.server = server;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://market:market2020@market-ejkss.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    () => {
      console.log(`Database connection successful`);
    },
    err => {
      console.log(`Error when conecting to the database. Err: ${err}`);
    }
  );

app.use("/api", api);
module.exports = app;
