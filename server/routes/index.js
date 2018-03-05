const user = require("../controllers/user.controller.js");
const marvel = require("../controllers/marvel.controller.js");
const event = require("../controllers/event.controller.js");

module.exports = function (router) {
  router.route("/user/login").post(user.login);
  router.route("/user").post(user.create);

  router.use(user.auth);

  router.route("/users").get(user.get);
  router.route("/marvel_characters").get(marvel.find);
  router.route("/events")
    .get(event.get)
    .post(event.create);

  return router;
};