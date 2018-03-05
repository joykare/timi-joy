const user = require("../controllers/user.controller.js");

module.exports = function (router) {
  router.route("/user/login").post(user.login);
  router.route("/user").post(user.create);

  router.use(user.auth);

  router.route("/users").get(user.get);

  return router;
};