var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file
var User   = require('./app/models/user'); 
var UserController   = require('./app/controllers/user'); 

var port = process.env.PORT || 8080; 
mongoose.connect(config.database); // connect to database
//app.set('superSecret', config.secret); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', UserController);

app.use(morgan('dev'));







app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
