var pathServer = '../../';
//https://www.npmjs.com/package/validator
var config = require(pathServer + 'config'); // get our config file
var jwt    = require('jsonwebtoken'); 
//http://lollyrock.com/articles/nodejs-encryption/
var crypto = require('crypto'),
    algorithm = config.crypto_algorithm,
    password = config.crypto_algorithm;


var authenticationHelper = function() {

	this.encrypt = function (text){
		console.log(config.algorithm);
		console.log(config.password);
		console.log(text);

		var cipher = crypto.createCipher(algorithm, password)
		var crypted = cipher.update(text,'utf8','hex')
		crypted += cipher.final('hex');
		return crypted;
	}

	this.decrypt = function (text){
		var decipher = crypto.createDecipher(algorithm, password)
		var dec = decipher.update(text,'hex','utf8')
		dec += decipher.final('utf8');
		return dec;
	}

	this.testEncryption = function(){
		var hw = this.encrypt("hello world")
		// outputs hello world
		console.log(hw);
		console.log(this.decrypt(hw));
	}

	this.createToken = function(user, rol){
		var token = jwt.sign(user, config.secret, {
         	expiresInMinutes: config.time_user_session // expires in 1 hour
        });
        return token;
	}

	this.getUserByToken = function (token){
	    var result = { user: {}, error: undefined };
	    if (token) {
	    	try {
				var isValid = jwt.verify(token, config.secret);
				if(isValid){
					var decoded = jwt.decode(token, config.secret);
					result['user'] = decoded._doc;
				}
				else{
					result['error'] = "Invalid token";
				}
			} catch(err) {
				result['error'] = err;
				console.log(err);
			}
	    }
	    if( result['error'] ){
	        return res.status(403).send({ 
	            success: false, 
	            message: result['error'],
	            data: []
	        });
	    }
	    return result['user'];
	}

	this.restrictAccess = function(req, res, next) {
	    var requestUrl = req.url;
	    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	    var Privilege   = require(pathServer + 'app/models/privilege');
	    //var Privilege   = require('./app/models/privilege');
	    var allowAccess = true;

	    Privilege.find({}).
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
	                    user = this.getUserByToken(token);
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
	}

}



module.exports = new authenticationHelper();
