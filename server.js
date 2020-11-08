// * required modules
const express = require("express"); // app instance
const session = require("express-session"); // keep track of user login status

// PORT designation
const PORT = process.env.PORT || 3220; // number of NFL teams & current year

// * create app instance
const app = express();

// configure express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
