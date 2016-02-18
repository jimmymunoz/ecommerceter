var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


module.exports = mongoose.model('Comment', new Schema({ 
	idComment: Number,
    idProduct: Number,
    idUser: Number,
	comment: String
}));