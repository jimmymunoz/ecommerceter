var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');
var mongoosePaginate = require('mongoose-paginate');

module.exports = mongoose.model('Payment', new Schema({ 
    code: String, 
    status: String 
}));

module.exports.paginate = mongoosePaginate;