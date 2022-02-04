const express = require("express");
var session = require("express-session");
const helmet = require("helmet");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Role = require('./models/Role');



app.use(express.json())
//---ALL ROUTES IMPORTS---------

const authRoute = require('./routes/auth');
const preferenceRoute = require('./routes/preference');
//------------------------------



//---ALL ROUTES MIDDLEWARES--------

app.use('/api/auth', authRoute);
app.use('/api/preference', preferenceRoute);

//--------------------------------







app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);

var corsOptions = {
  origin: "*",
};
dotenv.config();
connectDB();
console.log("--------------------"+process.env.MONGODB_URI)

app.use(cors(corsOptions));

app.use(morgan("tiny"));
app.use(helmet());

const port = process.env.PORT || 8000;

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
initial()

module.exports = app.listen(port, "0.0.0.0", () =>
  console.log("Server up and running " + port)
);
