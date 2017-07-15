var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var validation = require('./validation');
var MongoClient = require('mongodb').MongoClient;

router.post('/user/register/', function(req, res, next) {
    validation.validateRegistration(req.body, function(err, data) {
        if (err) {
            next(err);
        } else {
            var detail = new req.fetch({
                username: data.username,
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            })
            detail.save(function(err, data) {
                if (err) {
                    next(err);
                } else {
                    res.json(data)
                    
                }
            })
        }
    })
});


router.post('/user/login/', function(req, res, next) {
    validation.validateLogin(req.body, function(err, data) {
        if (err) {
            next(err);
        } else {
            req.fetch.findOne({ username: data.username, password: data.password }, function(err, docs) {
                if (err) {
                    next(err);
                } 
                if(docs)
                res.json('You are logged in!!!     Your access_token is : ' + docs._id)
            else
                res.json('Not a user !!!     Get registered')
            });
        }
    });
});

module.exports = router;