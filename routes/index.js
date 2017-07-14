var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var validation = require('./validation');

var MongoClient = require('mongodb').MongoClient;

router.post('/form/', function(req, res, next) {

    var userdatail;
    validation(req.body, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            userdatail = data;
            var detail = new req.fetch({
                username: userdatail.username,
                email: userdatail.email,
                password: userdatail.password,
                firstname: userdatail.firstname,
                lastname: userdatail.lastname
            })
            detail.save(function(err, data) {
                if (err) {
                    res.send(err.message);
                } else
                    res.send('Data Inserted')
            })
        }
    })
});

module.exports = router;
