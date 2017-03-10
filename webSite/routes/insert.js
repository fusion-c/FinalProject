var dataSet = require('../dataSet');
var events = require('events');
var io = require("socket.io");

global.dispatcher = new events.EventEmitter();

exports.save = function(req, res) {
    global.post_data = {
        "temperature" : Number(req.query.temperature),
        "air" : Number(req.query.air),
        "soil" : Number(req.query.soil),
        "illumination" :Number(req.query.illumination),
        "date" : Number(Date.now())
    };
    
    var add_data = new dataSet(post_data);
    // global.cip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);

    add_data.save(function(err) {
        if (err) {
            console.log("error!  Can't save to DB" + err.toString);
        } else {
            console.log("Ok!");
            global.posted = true;
            
            if (global.post_data['temperature'] < 10) {
                res.write("a");
            
                var sio = io.listen(global.server);
 	            sio.sockets.on('connection', function(client) {
 		            client.emit("water", 1);
 	            });
            }
        }
    });
    global.dispatcher.on("water", function(){
        res.write("a");
    });
};
