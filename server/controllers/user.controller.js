const User = require("../models/user.model.js");

module.exports = {
  create: (req, res) => {
    let user = new User();

    user.name = req.body.name;
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