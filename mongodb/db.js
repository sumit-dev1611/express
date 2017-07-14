// the middleware function
module.exports = function() {
    var mongoose = require('mongoose'); //require mongoose module
    var http = require('http');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    var conn = mongoose.connect('mongodb://admin:123@ds151232.mlab.com:51232/sumit');
    //connection to mongodb

    // create schema 
    var details = mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        pass: String,
        cpass: String,
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
    }, {
        collection: 'details',
        strict: false
    });

    var fetch_data = conn.model(fetch_data, details);
    return function(req, res, next) {
        req.fetch = fetch_data;
        next();
    }
}
