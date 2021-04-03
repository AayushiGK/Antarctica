
const config = require("./Config/config");
var models = require("./mysql/schema")().models;
var arrg = { models, config }
require('./Controller/controllers')(arrg);