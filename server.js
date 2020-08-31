// * required modules
const express = require("express"); // app instance
const db = require("./models"); // database models
const passport = require("./config/passport"); // our configured passport module
const session = require("express-session"); // keep track of user login status

// PORT designation
const PORT = process.env.PORT || 3220; // number of NFL teams & current year

// * create app instance
const app = express();
// configure express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// * required routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// * syncing database & logging message to the user upon success
// ! alter will update tables to match the models
// ! drop: false will prevent drop statements while altering a table
db.sequelize.sync({ alter: { drop: false } }).then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
