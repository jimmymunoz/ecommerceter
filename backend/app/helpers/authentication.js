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
         	expiresInMinutes: 60 // expires in 1 hour
        });
        return token;
	}
}

module.exports = new authenticationHelper();
