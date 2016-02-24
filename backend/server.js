var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file
var ACL = []; //Access control List
var authenticationHelper   = require('./app/helpers/authentication'); 

//var port = process.env.PORT || 8888;
var port = 8888;
mongoose.connect(config.database); // connect to database


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Default Paths
//Jimmy: Security
//app.use(authenticationHelper.restrictAccess);

//Controllers
app.use('/authentication', require('./app/controllers/authentication'));
app.use('/category', require('./app/controllers/category'));
app.use('/order', require('./app/controllers/order'));
app.use('/payment', require('./app/controllers/payment'));
app.use('/privilege', require('./app/controllers/privilege'));
app.use('/product', require('./app/controllers/product'));
app.use('/user', require('./app/controllers/user'));
app.get('/check', function(req, res) {
    res.json(req.decoded);
});

app.get('/', function(req, res) {
    res.send('API {' + config.appName + '}!!!!  http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Api Server: {' + config.appName + '} is Running\nhttp://localhost:' + port + '');
