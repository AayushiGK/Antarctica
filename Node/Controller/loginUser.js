// The user must use their Email ID and Password to login.

var _ = require("lodash");
var jwt = require("jsonwebtoken");
var router = require("express").Router();

module.exports = function (arrg) {
    var { Users } = arrg.models;
    router.post("/loginUser", (req, res, next) => {

        var body = _.pick(req.body, ["emailId", "password"]);

        Users.findOne({ where: { 'emailId': body.emailId } }).then(user => {
            if (arrg.utilities.verifyPassword(body.password, user.password)) {
                var token = createJWTToken(user.emailId, arrg.config.jwt.token);
                return res.send({
                    'emailId': user.emailId,
                    'token': token,
                });
            } else
                return res.status(403).send({ header: "Error", content: "Invalid Credentials" });
        }).catch(err => {
            return res.status(403).send({ header: "Error", content: "No User Found with Given Email-ID" });
        });
    });
    return router;
}

function createJWTToken(id, key) {
    var data = { id };
    var token = jwt.sign(data, key);
    return token;
}