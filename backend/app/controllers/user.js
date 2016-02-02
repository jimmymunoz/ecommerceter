var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
//Models:
var User   = require(pathServer + 'app/models/user'); 

var moduleRoutes = express.Router();



//Public Methods:
moduleRoutes.get('/setup', function(req, res) {
	var jimmy = new User({ 
		name: 'jimmy', 
		password: 'test',
		admin: true 
	});
	jimmy.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});


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

moduleRoutes.get('/public', function(req, res) {
	res.json({ message: 'public get' });
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


moduleRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

moduleRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

moduleRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});


module.exports = moduleRoutes;
