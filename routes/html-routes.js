// * required modules
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// app is the express instance initiated in server.js
module.exports = (app) => {
  // * main page
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("home");
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
