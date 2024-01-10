const express = require("express");
const constants = require("./config/constants");
const middlewareConfig = require("./config/middleware");
const routes = require("./routes/routes");
const app = express();

require("dotenv").config();
require("./config/database");

middlewareConfig(app);
routes(app);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${process.env.PORT} 
          --- Running on ${process.env.NODE_ENV} 
          --- Make something great.!`);
  }
});

module.exports = app;
