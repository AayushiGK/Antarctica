// The user must use their Email ID and Password to login.

var _ = require("lodash");
var jwt = require("jsonwebtoken");
var router = require("express").Router();

module.exports = function (arrg) {
  var { Users } = arrg.models;
  router.post(arrg.config.apiUrlInitial + "/loginUser", (req, res, next) => {

    // var body = _.pick(req.body, ["username", "password"]);
    Users.findOne({ where: { 'user_email': body.username } }).then(user => {
      if (arrg.utilities.verifyPassword(body.password, user.user_password)) {
        var token = createJWTToken(user.user_email, arrg.config.jwt.token);
        user.save();
        return res.send({
        //   'user_name': user.user_name,
        //   'user_email': user.user_email,
        //   'user_role': user.user_role,
        //   'user_department': user.user_department,
        //   'user_designation': user.user_designation,
          'token': token,
        });
      } else
        return res.status(403).send({ header: "Error", content: "Invalid Credentials" });
    }).catch(err => {
      return res.status(403).send({ header: "Error", content: "No Data" });
    });
  });
  return router;
}

function createJWTToken(id, key) {
  var data = { id };
  var token = jwt.sign(data, key);
  return token;
}