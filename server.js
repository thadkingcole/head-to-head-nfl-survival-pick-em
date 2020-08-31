// require modules
const express = require("express");
const app = express();

// PORT designation
const PORT = process.env.PORT || 3220; // number of NFL teams & current year

// require routes
require("./routes/html-routes")(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
