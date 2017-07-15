var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var validation = require('./validation');

var MongoClient = require('mongodb').MongoClient;

router.post('/user/register/', function(req, res, next) {

    validation.validateregistration(req.body, function(err, data) {
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
                    //res.status(400).json(err.message);
                } else
                    res.json('Data Inserted')
            })
        }
    })
});

module.exports = router;

router.post('/user/login/', function(req, res, next) {

    validation.validatelogin(req.body, function(err, data) {
        if (err) {
            next(err);
        } else {
            req.fetch.find({ username: data.username }, function(err, docs) {
                if (docs.length) {
                    req.fetch.find({ password: data.password }, function(err, docs1) {
                        if (docs1.length){
                            res.json('You are logged in!!!     Your access_token is:' + docs[0]._id)
                        }else
                            next(500);
                    });

                } else {
                    next(500);
                }

            });

        }
    });
});