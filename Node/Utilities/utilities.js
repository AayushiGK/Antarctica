const hash_Password = require("password-hash");

module.exports = function (arrg) {

    function hashPassword(password) {
        return hash_Password.generate(password);
    }

    function verifyPassword(password, hash) {
        return hash_Password.verify(password, hash);
    }

    return { hashPassword, verifyPassword }
}