//Register a user with First Name, Last Name, Email ID, Password, a unique employeeID and Organization Name.


module.exports = function (arrg) {
    var { Users } = arrg.models;
    router.post(arrg.config.apiUrlInitial + "/registerUser", (req, res, next) => {

        Users.create({}).then(users => {
            return res.status(200).send({ header: "Success", content: "User has been registered." })
        }).catch(() => {
            return res.status(422).send({ header: "Error", content: "User Registration Fail" });
        });
    });

    return router;
}