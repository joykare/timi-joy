const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
      jwt.verify(token, process.env.SUPER_SECRET, function (err, decoded) {
        if (err) {
          res.status(400).send({ message: "Failed to authenticate token" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({ message: "No token provided" });
    }
  },

  login: (req, res) => {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) {
        res.status(500).send({
          message: "Failed to log in, try again"
        });
      }
      if (!user) {
        res.status(401).send({
          message: "Authentication failed. User not found"
        });
      } else if (user) {
        // check pass match
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(401).send({
            message:  "Authentication failed. Wrong password entered"
          });
        } else {
          // if password matches create token
          const payload = {
            email: user.email
          };
          const token = jwt.sign(payload, process.env.SUPER_SECRET, { expiresIn: "12h" });
          res.send({
            success: true,
            message: "Enjoy your token",
            token: token
          });
        }
      }
    });
  },

  create: (req, res) => {
    let user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, user) => {
      if(err) {
        if(err.code === 11000) {
          res.status(400).send({
            message: "Duplicate Entry"
          });
        } else {
          res.status(500).send({
            message: "Error occured while saving user"
          });
        }
      } else {
        res.send(user);
      }
    });
  },

  get: (req, res) => {
    User.find((err, users) => {
      if (err) {
        res.status(500).send({
          message: "Error occured while accessing the user"
        });
      } else {
        res.json(users);
      }
    });
  }
};