//third party imports;
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

//app imports
const ErrorHandler = require("./middleware/error");
const appRoutes = require('./routes');

if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config({
      path:"./config/.env"
  })
}
const app = express();
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
  }));
  
  app.use(express.json());
  app.use(cookieParser());
  app.use("/test", (req, res) => {
    res.send("Hello world!");
});

app.use("/", express.static('uploads'))
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// const user = require("./controller/user");
// app.use("/api/user", user)
appRoutes(app);
// it's for ErrorHandling
app.use(ErrorHandler);
module.exports = app;

