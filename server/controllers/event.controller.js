const Event = require("../models/event.model.js");

module.exports = {
  create: (req, res) => {
    const event = new Event();

    event.ownerId = req.decoded.id || req.body.ownerId;
    console.log("req.decoded", req.decoded, req.body.characterName);
    event.characterName = req.body.characterName;

    event.save(function(err, event) {
      if (err) {
        console.log("err", err);
        if (err.code === 11000) {
          res.status(403).send({
            message: "Duplicate entry"
          });
        } else {
          res.status(500).send({
            message: "Error occured while saving the event"
          });
        }
      } else {
        res.send(event);
      }
    });
  },

  get: (req, res) => {
    // future versions with queries would be awesome
    // TODO: Add queries
    // const limit = req.query.limit || req.headers.limit;
    // const skip = req.query.skip || req.headers.skip;
    // const date = req.query.date;
    // const role = req.query.role;

    Event.find((err, events) => {
      if (err) {
        res.status(500).send({
          message: "Error occured while accessing the user"
        });
      } else {
        res.json(events);
      }
    });
  }
};
