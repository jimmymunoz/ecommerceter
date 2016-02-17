var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();
//Models:
var User   = require(pathServer + 'app/models/user');

//http://localhost:8888/user/setup
var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();


var User   = require(pathServer + 'app/models/user');

//http://localhost:8888/user/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid User action', data: req.decoded });
});

//http://localhost:8888/user/getUser?idUser=1
moduleRoutes.get('/getUser', function(req, res) {
    User.
        findOne({ idUser: req.query.idUser }).
        //where('idUser').equals(req.query.idUser).// =
        //where('idUser').gt(17).lt(66).// gt - lt
        //where('idUser').in(['idUser', req.query.idUser]).// like
        //limit(10).
        sort('-idUser').
        select('idUser firstName lastName email password address image phone rol InscriptionDate updateDate ').
        exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'User not found.', data: [] });
        } 
        else if (user) {
                res.json({
                success: true,
                message: 'User Found',
                data: user
            });
        }
    });
});

//http://localhost:8888/user/getUsersList
moduleRoutes.get('/getUsersList', function(req, res) {
    User.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('idUser firstName lastName email password address image phone rol InscriptionDate updateDate ').
    exec(function(err, Users) {
        res.json({ success: true, message: 'User List:', data: Users });
    });
});

//http://localhost:8888/user/createUser
moduleRoutes.post('/createUser', function(req, res) {
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
        InscriptionDate: req.body.InscriptionDate, 
        updateDate: req.body.updateDate 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataUser });
    });
});

//http://localhost:8888/user/updateUser?idUser=1
moduleRoutes.post('/updateUser', function(req, res) {
    var queryWhere = { idUser: req.body.idUser };
    var updateFields = {  
        idUser: req.body.idUser, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        password: req.body.password, 
        address: req.body.address, 
        image: req.body.image, 
        phone: req.body.phone, 
        rol: req.body.rol, 
        InscriptionDate: req.body.InscriptionDate, 
        updateDate: req.body.updateDate 
    };
    
    User.update(
        queryWhere, //query
        updateFields, //update
        function (err, raw) {
            if (err) return handleError(err);

            var msgResponse = 'User updated successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: raw });
        }
    );
});
 
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
                console.log(decoded);
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

//http://localhost:8888/user/removeUser?idUser=1
moduleRoutes.post('/removeUser', function(req, res) {
    User.remove({
        idUser: req.body.idUser
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Error: User can not deleted', data: User });
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

module.exports = moduleRoutes;
