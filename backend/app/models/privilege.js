var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');
var mongoosePaginate = require('mongoose-paginate');

module.exports = mongoose.model('Privilege', new Schema({ 
    action: String, 
    rol: String 
}));

module.exports.paginate = mongoosePaginate;