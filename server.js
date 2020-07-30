const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const app = express();

// bodyParser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

passport.initialize()
require("./config/passport")(passport);

// use the database
const DBConnect = require('./config/DBConnect');
DBConnect();

// use the router path
const Resources = require('./routes/Resources');
const Auth = require("./routes/Auth");
app.use('/admin/resources', Resources);
app.use('/', Auth);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server Running on ${PORT} or Click on http://localhost:${PORT}`);
});