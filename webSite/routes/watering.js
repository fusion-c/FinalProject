var net = require('net');


exports.watering = function(req, res) {
    // var ip = global.cip;
    global.dispatcher.emit("water");
    res.redirect ("back");
}
