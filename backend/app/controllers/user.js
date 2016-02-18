var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();
//Models:
var User   = require(pathServer + 'app/models/user');

//http://localhost:8888/user/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataUser = new User({ 
        idUser: 1, 
        firstName: 'Jimmy', 
        lastName: 'MUNOZ', 
        email: 'myappeu@gmail.com', 
        password: 'jimmypass', 
        address: '345 Rue des Azalées', 
        image: 'images/user/jimmy.png', 
        phone: ' +33 988765432', 
        rol: 'admin', 
        creationDate: Date('2014-04-30T14:00:00.000Z'), 
        updateDate: Date('2014-04-30T14:00:00.000Z') 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;
        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//http://localhost:8888/user/createUser
moduleRoutes.get('/createUser', function(req, res) {
   var dataUser = new User({ 
        idUser: req.body.idUser, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password, 
        address: req.body.address, 
        image: req.body.image, 
        phone: req.body.phone, 
        rol: req.body.rol, 
        creationDate: req.body.creationDate, 
        updateDate: req.body.updateDate 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//http://localhost:8888/user/getUser?idUser=1
moduleRoutes.get('/getUser', function(req, res) {
    if( req.query.idUser != undefined ){
    	//var userResponse = User.getUser(res, req.query.idUser);
    	//res.json( userResponse );
        
        User.findOne({
           idUser: req.query.idUser
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                console.log("not found");
                response = { success: false, message: 'User not found.', data: [] };
                res.json(response);
            } 
            else if (user) {
                console.log("found ");
                response = {
                    success: true,
                    message: 'User Found :)',
                    data: User
                };
                res.json(response);
            }
        });
    }
    else{
    	res.json({ success: false, message: 'Undefined {idUser}', data: [] }); 
    }
});

//http://localhost:8888/user/updateUser?idUser=1
moduleRoutes.get('/updateUser', function(req, res) {
    User.findById(req.body.idUser, function (err, user) {
        if (err) return handleError(err);
         
        idUser = req.body.idUser; 
        firstName = req.body.firstName; 
        lastName = req.body.lastName; 
        email = req.body.email; 
        password = req.body.password; 
        address = req.body.address; 
        image = req.body.image; 
        phone = req.body.phone; 
        rol = req.body.rol; 
        creationDate = req.body.creationDate; 
        updateDate = req.body.updateDate;

        User.save(function (err) {
                if (err) return handleError(err);
                res.send(user);
        });
    });
});


//http://localhost:8888/user/removeUser?idUser=1
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
                    message: 'User Deleted',
                    data: user
            });
        }
    });
});
//http://localhost:8888/user/getUsersList
moduleRoutes.get('/getUsersList', function(req, res) {
    User.find({}, function(err, Users) {
        res.json({ success: true, message: 'User List:', data: Users });
    });
});
http://localhost:8888/user/
moduleRoutes.get('/getUsersList', function(req, res) {
    res.json({ success: true, message: 'Not action found User', data: Users });
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

module.exports = moduleRoutes;
