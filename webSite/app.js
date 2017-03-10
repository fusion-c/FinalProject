/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , insert = require('./routes/insert')
  , list = require('./routes/list')
  , diagram = require('./routes/diagram')
  , watering = require('./routes/watering')
  , http = require('http')
  , path = require('path');
var ejs = require('ejs');
var app = express();


// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.use(express.logger('dev'));
app.use(express.bodyParser());

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon('favicon.ico'));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

global.server = http.createServer(app).listen(app.get('port'), function(err){
	if(err) {
		console.log("error: " + err.toString());
	}
	console.log('Express server listening on port ' + app.get('port')+'\t' + app.get('env'));
});

app.get('/', routes.index);

app.all('/list', list.find);

app.all("/diagram", diagram.find);
//app.get('/users', user.list);

app.get('/watering', watering.watering);
app.get('/insert', insert.save);




