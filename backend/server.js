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

app.use(function(req, res, next) {
    var requestUrl = req.url;
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    
    
    //var Privilege   = require(pathServer + 'app/models/privilege');
    var Privilege   = require('./app/models/privilege');
    var allowAccess = true;

    Privilege.find({}).
        sort('-idCategory').
        select('action rol ').
        exec(function(err, Privileges) {
            //console.log(Privileges);
            
            var urlIsProtected = false;
            for (var i in Privileges){
                if( Privileges[i]['action'] == requestUrl ){
                    urlIsProtected = true;
                    allowAccess = false;//Interdir l'access quand il existe une url dans la liste de privileges
                    break;
                }
            }
            console.log("urlIsProtected: " + urlIsProtected);
            
            var user;
            var userRol = "";
            if( urlIsProtected ){
                if(token){
                    var authDecoded = authenticationHelper.getUserByToken(token);
                    if( authDecoded['error'] ){
                        return res.status(403).send({ 
                            allowAccess: allowAccess, 
                            success: false, 
                            message: authDecoded['error'],
                            data: []
                        });
                    }
                    user = authDecoded['user'];
                    console.log(user);
                    userRol = user.rol;
                    if( userRol != '' ){
                        //Jimmy: User Exists in the ACL?
                        for (var i in Privileges){
                            if( Privileges[i]['action'] == requestUrl && Privileges[i]['rol'] == userRol  ){
                                allowAccess = true;
                                break;
                            }
                        }
                    }
                }
                else{
                    return res.status(403).send({ 
                        allowAccess: allowAccess, 
                        success: false, 
                        message: 'Access Denied. (' + requestUrl + ') -  No token provided.',
                        data: []
                    });
                }
            }

            if (! allowAccess) {
                return res.status(403).send({ 
                    allowAccess: allowAccess, 
                    success: false, 
                    message: 'Access Denied. (' + requestUrl + ')  - Rol: ' + userRol,
                    data: []
                });
            }

            console.log("allowAccess: " + allowAccess);
            next();
        });
});



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
