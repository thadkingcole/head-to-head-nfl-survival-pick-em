// * required modules
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

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
  app.get("/members", isAuthenticated, async (req, res) => {
    // get data for logged in user
    const inUser = {
      username: req.user.username,
      wins: req.user.wins,
      pointDiff: req.user.pointDiff,
    };
    // get data for all users for standings
    const allUsers = await db.User.findAll({
      attributes: {
        // never a good idea to return a password, hashed or not
        exclude: ["password"],
      },
      // order by wins, then by point diff
      order: [
        ["wins", "desc"],
        ["pointDiff", "desc"],
      ],
    });
    // get list of available teams
    const allTeams = await db.Team.findAll({});
    res.render("home", { inUser, allUsers, allTeams });
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
