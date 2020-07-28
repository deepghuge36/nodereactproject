const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// bodyParser middleware 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use the database 
const DBConnect = require('./config/DBConnect');
DBConnect();

// use the router path 
const Resources = require('./routes/Resources');
app.use('/admin/resources', Resources)


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server Running on ${PORT} or Click on http://localhost:${PORT}`);
});

