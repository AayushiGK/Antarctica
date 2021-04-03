//Register a user with First Name, Last Name, Email ID, Password, a unique employeeID and Organization Name.


module.exports = function (arrg) {
    var { Users } = arrg.models;
    router.post("/registerUser", (req, res, next) => {

        var { firstName, lastName, emailId, password, employeeId, organisationName } = req.body;
        var hashed_password = arrg.utilities.hashPassword(password);

        Users.create({ firstName, lastName, emailId, hashed_password, employeeId, organisationName }).then(new_user => {
            return res.status(200).send({ header: "Success", content: "User has been registered." })
        }).catch(() => {
            return res.status(422).send({ header: "Error", content: "User Registration Fail" });
        });
    });

    return router;
}