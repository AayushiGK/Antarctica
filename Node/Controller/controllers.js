var app;
const appRoot = require("app-root-path");
module.exports = function (arrg) {
    app = startApp(arrg);
    return {
        app
    };
};

function startApp(arrg) {
    var { Users } = arrg.models;
    var express = require("express");
    var cors = require("cors");
    var cookieParer = require("cookie-parser");
    var compression = require("compression");
    var methodOverride = require("method-override");
    var path = require("path");
    var jwt = require("jsonwebtoken");

    app = express();
    var http = require("http").Server(app);
    var server = http.listen(process.env.PORT || arrg.config.server.port, () => {
        console.log(`Listening on ${server.address().address}:${server.address().port}`);
    });

    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.use(cookieParer());
    app.use(express.static('dist'));
    if (process.env.NODE_ENV != "production") {
        app.use((req, res, next) => {
            console.log(`${req.method}: ${req.url}  \n${JSON.stringify(req.body)}`, '\n');
            next();
        });
    }

    app.use((req, res, next) => {
        if ([arrg.config.apiUrlInitial].indexOf("/" + req.url.split("/")[1]) >= 0) {
            if (req.headers['x-auth']) {
                const token = req.headers['x-auth'];
                jwt.verify(token, arrg.config.jwt.token, (err, decoded) => {
                    if (err)
                        return res.status(403).end("Unauthorized");
                    Users.findOne({ where: { 'user_email': decoded.id, 'user_disable': '0' } }).then(user => {
                        if (user == null)
                            return res.status(403).end("User Not found");
                        userObject = user;
                        req.data = {
                            // Email: user.user_email.toString(),
                            // role: userObject.user_role,
                            // user_department: user.user_department,
                            // user_designation: user.user_designation,
                            // user_name: user.user_name,
                            // user_wi: user.user_wi,
                            // user_manager: user.user_manager,
                        };
                        next();
                    });
                });
            } else {
                if (['api', 'public'].indexOf(req.url.split("/")[2]) >= 0)
                    next();
                else
                    res.status(403).end();
            }
        }
        else
            next();
    });

    app.use("/", require("./registerUser")(arrg));
    app.use("/", require("./loginUser")(arrg));
    app.use("/", require("./fetchUser")(arrg));

    app.get('/*', function (req, res) {
        p = path.join(appRoot.toString(), 'index.html');
        res.sendFile(path.join(p));
    });

    arrg.app = app;
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    return app;
}