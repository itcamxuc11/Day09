var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // get body-parser
var morgan     = require('morgan');         // used to see requests
var mongoose   = require('mongoose');
var config     = require('./config');
var path       = require('path');
	

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
23.	
24.	// configure our app to handle CORS requests
app.use(function(req, res, next) {
	    res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	    next();
	});
	
// log all requests to the console 
app.use(morgan('dev'));
// student can try to conntect to Mongo remotely which post in cloud
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true }); 
mongoose.set('useCreateIndex', true);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================
// API ROUTES ------------------------

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Dang dung Port: ' + config.port);

