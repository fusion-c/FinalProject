module.exports = function() {
    var mongo = require('mongoose');

    mongo.Promise = global.Promise;
    var db = mongo.connect('mongodb://127.0.0.1/sensors');
    db.connection.on("error", function (error) {
        console.log("数据库连接失败：" + error);
    });
    db.connection.on("open", function () {
        console.log("------数据库连接成功！------");
        global.db = db;
    });
};
