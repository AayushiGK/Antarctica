// Get all list of users with following criteria:
// 1. Search using First Name, Last Name and employeeID
// Users.findOne({ where: { user_email:  req.data.Email } })

// 2. Sort data by First Name, Last Name, Email ID, employeeID and Organization Name
// Foo.findOne({ order: [ ['name'], ['username', 'DESC']]});

// 3. Add pagination to your API to filter the records
// Project.findAll({ limit: 10 });

const router = require("express").Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = function (arrg) {
    var { Users } = arrg.models;

    router.get(arrg.config.apiUrlInitial + "/fetchUsers", (req, res, next) => {
        Users.findAll({}).then(users => {
            return res.send({ data: users });
        }).catch(() => {
            return res.status(422).send({ header: "Error", content: "err-msg.NoData" });
        });
    });

    return router;
}