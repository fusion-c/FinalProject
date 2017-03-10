var dataSet = require("../dataSet");

exports.find = function(req, res) {
	var now = Date.now();
	var startTime = new Date(req.body.startTime).getTime() || now - 3600000;
	var endTime = new Date(req.body.endTime).getTime() || now - 20010;

	dataSet.findOne().sort("date").exec(function(err, item) {  // 1 level
		if (err) {
			console.log("error!  No data in DB" + err.toString);
		} else {
			dataSet.count({"date" : {$gte : startTime, $lte : endTime}},
				function(err, total) {                          // 2 level
					if(err || total <= 0) {
						//console.log("count error! " + err);
                        res.render("diagram", {result : 0, dbStartTime : item["date"]
                                            , start : startTime, end : endTime, 
                                            total : total});
					}  else {
						dataSet.find({"date": {$gte: startTime, $lte: endTime} })
						.sort("-date").exec(function(err, docs) {    // 3 level
                            if(err){
                                console.log("docs Error!!!\n");
                            } else {
                                res.render("diagram", {result : docs, dbStartTime : item["date"],
                                            total : total, start : startTime, end : endTime});
                            }
						});
					}
				});
		}
    });
};

