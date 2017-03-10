var mongo = require('mongoose');
var connDB = require('./conn');
connDB();

var schema = new mongo.Schema(
{
   "temperature"    : Number,
    "air"           : Number,
    "soil"          : Number,
    "illumination"  : Number,
    "date"          : Number
});

var dht = mongo.model("dht", schema, "dht");

module.exports = dht;
//module.exports.db = db;
