// * required modules
const express = require("express"); // app instance
const session = require("express-session"); // keep track of user login status
const mongoose = require("mongoose"); // mongoDB orm
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
require("dotenv").config();

const mongooseConnection = require("./db");

// TODO: develop backend routes
// const routes = require("/.routes");

// PORT designation
const PORT = process.env.PORT || 3220; // number of NFL teams & current year

// * create app instance
const app = express();

// configure express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
process.env.NODE_ENV === "production" &&
  app.use(express.static("client/build"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// TODO: Add routes
// app.use(routes);

// Start the API server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
