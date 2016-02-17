var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file
var ACL = []; //Access control List

//var port = process.env.PORT || 8888; 
var port = 8888; 
mongoose.connect(config.database); // connect to database


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
	//var Privilege   = require(pathServer + 'app/models/privilege');
	var Privilege   = require('./app/models/privilege');
	Privilege.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('action rol ').
    exec(function(err, Privileges) {
        
        ACL = Privileges;
        console.log(ACL);
        //res.json({ success: true, message: 'Privilege List:', data: Privileges });
        next();
    });
});

console.log(ACL);

//Controllers
app.use('/authentication', require('./app/controllers/authentication'));
app.use('/category', require('./app/controllers/category'));
app.use('/order', require('./app/controllers/order'));
app.use('/payment', require('./app/controllers/payment'));
app.use('/privilege', require('./app/controllers/privilege'));
app.use('/product', require('./app/controllers/product'));
app.use('/user', require('./app/controllers/user'));


//Default Paths
app.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.get('/', function(req, res) {
	res.send('API {' + config.appName + '}!!!!  http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Api Server: {' + config.appName + '} is Running\nhttp://localhost:' + port + '');
