// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

// set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('productEvaluation', new Schema({
    idProduct: Number,
    evaluation: Number,
    email: String,
    evaluationDate: Date
}));

module.exports.paginate = mongoosePaginate;