// app is the express instance initiated in server.js
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
};
