const user = require("../controllers/user.controller.js");

module.exports = function (router) {
  router.route("/user").post(user.create);
  router.route("/user/login").post(user.login);
  return router;
};