var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file
var User   = require('./app/models/user'); 
var UserController   = require('./app/controllers/user'); 
var PaymentController   = require('./app/controllers/payment'); 

var port = process.env.PORT || 8080; 
mongoose.connect(config.database); // connect to database


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/user', UserController);
app.use('/payment', UserController);





app.get('/', function(req, res) {
	res.send('!!!API {' + config.appName + '}!!!!  http://localhost:' + port + '/api');
});

app.listen(port);
console.log('---Api Server: {' + config.appName + '} is Running :)----\nhttp://localhost:' + port + '');
