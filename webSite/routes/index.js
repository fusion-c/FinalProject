
/*
 * GET home page.
 */
 var io = require("socket.io");
 var dataSet = require("../dataSet");
 var data =  {};
 
 exports.index = function(req, res) {
	res.render('index');
	var sio = io.listen(global.server);
 	if(typeof global.posted === 'undefined') {
 		dataSet.findOne().sort("-date").exec(function(err, item) {
 			if (err) {
 				console.log("error!  Can't find data in DB" + err.toString);
 			} else {
 				global.post_data = item;
 				data.temperature = post_data["temperature"];
 				data.air = post_data["air"];
 				data.soil = post_data["soil"];
 				data.illumination = post_data["illumination"];
 				data.date = post_data["date"];

 				sio.sockets.on('connection', function(client) {
 				client.emit("data", data);
 				setInterval(function() {
 					client.emit("data", data);
 				}, 10000);
 				});
 			}
 		});
 	} else {
 		data.temperature = post_data["temperature"];
 		data.air = post_data["air"];
 		data.soil = post_data["soil"];
 		data.illumination = post_data["illumination"];
 		data.date = post_data["date"];

 		sio.sockets.on('connection', function(client) {
 		client.emit("data", data);
 		setInterval(function() {
 			client.emit("data", data);
 		}, 10000);
 		});
 	}

 };


