const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./server/routes");
var router = express.Router();
const env = process.env.NODE_ENV;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api", routes(router));

let DB_URI;

// some future time when I actually have a testing thingy
if (env === "testing") {
  // TODO: change this
  DB_URI= "mongodb://<dbuser>:<dbpassword>@ds153778.mlab.com:53778/marvel-dev";
}
DB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153778.mlab.com:53778/marvel-dev`;

mongoose.connect(DB_URI, (error) => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("successful db connect");
  }
});
app.get("/", (req, res) => res.send("Hey"));

app.listen(3000, function(){
  console.log("App listening on port 3000");
});

module.exports = app;