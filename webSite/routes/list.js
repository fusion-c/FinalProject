var dataSet = require("../dataSet");

exports.find = function(req, res) {
    console.log(typeof(req.query.p));
	var currentPage = req.query.p || 1;
	var numberOfElement = 10;
	var totalPages;
	var now = Date.now();
	var startTime = new Date(req.body.startTime).getTime() || now - 3600000;
	var endTime = new Date(req.body.endTime).getTime() || now - 10010;
    
    if(req.query.p) {
        startTime = Number(req.body.startTime);
        endTime = Number(req.body.endTime);
        currentPage = Number(currentPage);
    }

	dataSet.findOne().sort("date").exec(function(err, item) {  // 1 level
		if (err) {
			console.log("error!  No data in DB" + err.toString);
		} else {
			dataSet.count({"date" : {$gte : startTime, $lte : endTime}},
				function(err, total) {                          // 2 level
					if(err) {
						console.log("count error! " + err.toString());
                        res.render("list", {result : 0});
					} else if (total <= 0) {
                        console.log("Can't find!");
                        res.render("list", {result : 0, totalPages : totalPages,
                                dbStartTime : item["date"],
                                start : startTime, end : endTime});
                    } else {
						totalPages = Math.ceil( total/numberOfElement);

						dataSet.find({"date":{$gte: startTime, $lte: endTime} })
						.sort("-date").skip( (currentPage-1)*numberOfElement )
						.limit(10).exec(function(err, docs) {           // 3 level

							res.render("list", {result : docs, totalPages : totalPages,
								currentPage : currentPage, dbStartTime : item["date"],
                                start : startTime, end : endTime});
						});
					}
				});
		}
    });
};

