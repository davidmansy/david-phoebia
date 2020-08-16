const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const fs = require("fs");

// configure our express instance with some body-parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes.js")(app, fs);

// launch server on port 5000.
const server = app.listen(5000, () => {
  console.log("listening on port %s...", server.address().port);
});
