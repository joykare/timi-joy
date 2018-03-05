const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.send({
          message: "Authentication failed. User not found"
        });
      } else if (user) {
        // check pass match
        console.log("user", user, req.passsword);
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
  }
};