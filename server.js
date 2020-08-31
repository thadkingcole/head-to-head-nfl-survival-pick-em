// required modules
const express = require("express"); // app instance
const db = require("./models"); // database models

// PORT designation
const PORT = process.env.PORT || 3220; // number of NFL teams & current year

// * create app instance
const app = express();

// * configure express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// * required routes
require("./routes/html-routes")(app);

// * syncing database & logging message to the user upon success
// ! alter will update tables to match the models
// ! drop: false will prevent drop statements while altering a table
db.sequelize.sync({ alter: { drop: false } }).then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
});
