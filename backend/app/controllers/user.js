var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
//Models:
var User   = require(pathServer + 'app/models/user'); 

var moduleRoutes = express.Router();


//Public Methods:
var User   = require(pathServer + 'app/models/user'); 

//http://localhost:8080/user/getUser?id=1
moduleRoutes.get('/getUser', function(req, res) {
	User.findOne({
		id: req.body.id
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'User not found.:(' });
		} 
		else if (user) {

			res.json({
				success: true,
				message: 'User Found :)',
				data: user
			});
		}
	});
});

//http://localhost:8080/user/geUser?idUser=1
moduleRoutes.post('/removeUser', function(req, res) {
        User.remove({
                idUser: req.body.idUser
        }, function(err, user) {
                if (err) throw err;

                if (!user) {
                        res.json({ success: false, message: 'Error: User can not deleted', data: [] });
                } 
                else if (user) {

                        res.json({
                                success: true,
                                message: 'User Found :)',
                                data: user
                        });
                }
        });
});

//http://localhost:8080/user/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataUser = new User({ 
        id: 1, 
        firstName: 'Jimmy', 
        lastName: 'MUNOZ', 
        email: 'myappeu@gmail.com', 
        password: 'testpass', 
        address: '345 Rue des Azalées', 
        image: 'images/user/jimmy.png', 
        phone: ' +33 988765432' 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, msgResponse: msgResponse, data: [] });
    });
});

//http://localhost:8080/user/authenticate
moduleRoutes.post('/authenticate', function(req, res) {
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} 
		else if (user) {

			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} 
			else {

				var token = jwt.sign(user, config.secret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}	
		}
	});
});



//Restricted Methods:
moduleRoutes.use(function(req, res, next) {
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			}
			else {
				
				req.decoded = decoded;	
				next();
			}
		});
	}
	else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
});


//http://localhost:8080/user/
moduleRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

//http://localhost:8080/user/users
moduleRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

//http://localhost:8080/user/check
moduleRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});


module.exports = moduleRoutes;
