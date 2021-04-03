module.exports = function () {
    const Sequelize = require('sequelize');
    const { db } = require('../Config/config');
    const sequelize = new Sequelize(db.mysql_db, db.mysql_user, db.mysql_password, {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        operatorsAliases: false,
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
        },
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });
    sequelize.authenticate().then(() => { }).catch(() => { });

    // Create Two (2) Tables/Collections for users and employees
    
    // First Name, Last Name, Email ID, Password, a unique employeeID and Organization Name
    const Users = sequelize.define('users', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        emailId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: Sequelize.STRING,
        employeeId: Sequelize.STRING,
        organisationName: Sequelize.STRING
    });

    return { models: { Users } }
}