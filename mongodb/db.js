module.exports = function() {
    var mongoose = require('mongoose');
    var http = require('http');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    var conn = mongoose.connect('mongodb://admin:123@ds151232.mlab.com:51232/sumit');

    var details = mongoose.Schema({
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String,
        firstname: String,
        lastname: String
    }, {
        collection: 'details',
        strict: true
    });

    var fetch_data = conn.model(fetch_data, details);
    return function(req, res, next) {
        req.fetch = fetch_data;
        next();
    }
}
