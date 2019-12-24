const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const api = require("./routes/api/api");
const Authorization= require("./auth/Authorization")
var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes with Authorisation Middleware
app.use("/api/stocklist",Authorization,api );

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));