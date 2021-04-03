
const config = require("./Config/config");
var models = require("./mysql/schema")().models;
var arrg = { models, config }
const utilities = require("./Utilities/utilities")(arrg);
arrg.utilities = utilities;
require('./Controller/controllers')(arrg);