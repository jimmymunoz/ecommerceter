var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

autoIncrement = require('mongoose-auto-increment');
var mongoosePaginate = require('mongoose-paginate');

var connection = mongoose.createConnection("mongodb://localhost/exportster");
autoIncrement.initialize(connection);

var schemaComment = new Schema({ 
	idComment: Number,
    idProduct: Number,
    idUser: Number,
	comment: String,
	creationDate: Date, 
    modificationDate: Date 
});

schemaComment.plugin(autoIncrement.plugin, { model: 'comments', field: 'idComment' });
module.exports = mongoose.model('Comment',schemaComment);

module.exports.paginate = mongoosePaginate;