var express = require('express')
  , cors = require('cors')
  , app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var redirect = require("express-redirect");

var config = require('./config'); // get our config file
var ACL = []; //Access control List
var authenticationHelper   = require('./app/helpers/authentication'); 

//var port = process.env.PORT || 8888;
var port = 8888;
mongoose.connect(config.database); // connect to database

redirect(app); // mount the plugin redirect
//Cross Origin
  console.log(app);
app.all('/*', function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  console.log(req.method);
  switch(req.method){
      case 'POST':
        console.log("redirect");
        app.redirect("/category/", "/category/createCategory", "post");
        break;
      case 'PUT':
        console.log("redirect");
        app.redirect("/category/:idCategory", "/category/category/updateCategory", "post");
        break;
      case 'DEL':
      case 'DELETE':
        console.log("redirect");
        app.redirect("/category/:idCategory", "/category/category/removeCategory", "del");
        break;
      case 'OPTIONS':
        console.log("redirect");
        break;
      case 'GET':
      default:
        app.redirect("/category/", "/category/getCategorysList", "get");
        app.redirect("/category/:idCategory", "/category/getCategory", "get");
        break;
  }

	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(expressValidator());
app.use(cors());
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

//express-redirect mounts the new method 
//app.redirect(route, target, [status], [method], [qsa]) to your app. You can access it just like app.get() or app.post() etc.


/*
https://erichonorez.wordpress.com/2013/02/10/how-create-a-rest-api-with-node-js-and-express/
GET  /books/ .... collection.fetch();
POST /books/ .... collection.create();
GET  /books/1 ... model.fetch();
PUT  /books/1 ... model.save();
DEL  /books/1 ... model.destroy();
 */

app.get('/', function(req, res) {
    res.send('API {' + config.appName + '}!!!!  http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Api Server: {' + config.appName + '} is Running\nhttp://localhost:' + port + '');
