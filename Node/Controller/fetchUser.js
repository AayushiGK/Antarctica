// Get all list of users with following criteria:
// 1. Search using First Name, Last Name and employeeID
// Users.findAll({ where: { emailId: emailId } })

// 2. Sort data by First Name, Last Name, Email ID, employeeID and Organization Name
// Users.findAll({ order: [ ['firstName'], ['lastName']});

// 3. Add pagination to your API to filter the records
// Users.findAll({ limit: 10 });

const router = require("express").Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = function (arrg) {
    var { Users } = arrg.models;

    router.get("/fetchUsers", (req, res, next) => {
        var { firstName, lastName, emailId } = req.body;
        Users.findAll({ where: { firstName, lastName, emailId } }, { limit: 20 }, { order: [['firstName'], ['lastName'], ['emailId'], ['employeeId'], ['organisationName']] }).then(users => {
            return res.send({ data: users });
        }).catch(() => {
            return res.status(422).send({ header: "Error", content: "No Data Found" });
        });
    });

    return router;
}