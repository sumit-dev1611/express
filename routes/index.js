var express = require('express');
var router = express.Router();
var validation = require('./validation');

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
                } else if (docs) {
                    res.json('You are logged in!!!     Your access_token is : ' + docs._id)
                } else {
                    res.json('Not a user !!!     Get registered')
                }
            });
        }
    });
});

router.get('/user/get/:access_token', function(req, res, next) {
    req.fetch.findOne({ _id: req.params.access_token }, function(err, data) {
        if (err) {
            next(err);
        } else if (data) {
            res.json(data)
        } else {
            res.json('data not found');
        }
    });
});

router.get('/user/delete/:access_token', function(req, res, next) {
    req.fetch.findOne({ _id: req.params.access_token }, function(err, data) {
        if (err) {
            next(err);
        } else if (data) {
            req.fetch.remove({ "_id": data._id }, function(err, result) {
                if (err) {
                    next(err);
                } else {
                    res.json('data deleted');
                }
            });
        } else {
            res.json('data not found');
        }
    });
});

module.exports = router;