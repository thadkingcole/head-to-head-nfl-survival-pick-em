// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
require("dotenv").config();
const axios = require("axios").default;
const moment = require("moment");

module.exports = (app) => {
  // get list of a week's games
  app.get("/week/:num", (req, res) => {
    const weekNum = req.params.num;
    const year = 2020; // ! change at start of this each season
    const sportradarWeekUrl = `http://api.sportradar.us/nfl/official/trial/v6/en/games/${year}/REG/${weekNum}/schedule.json?api_key=${process.env.sportsradarApiKey}
    `;
    axios.get(sportradarWeekUrl).then((response) => {
      const gameInfo = response.data.week.games.map((game) => {
        const id = game.id;
        const num = game.number;
        const time = moment(game.scheduled).format("ddd M/D h:mm a");
        const away = game.away.name;
        const home = game.home.name;
        return { id, num, time, away, home };
      });
      // put in order by asc game number, which goes in order from thu to mon
      gameInfo.sort((a, b) => a.num - b.num);

      res.json(gameInfo);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", async (req, res) => {
    // Prevent more than 2 users signing up
    const userCount = await db.User.count();
    // if less than 2 users, allow the signup to happen
    if (userCount < 2) {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
      })
        .then(() => {
          res.redirect(307, "/api/login");
        })
        .catch((err) => {
          res.status(401).json(err);
        });
    } else {
      // do not allow more signups after adding 2 users
      res.status(403).json("There are already 2 users");
    }
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
      });
    }
  });
};
