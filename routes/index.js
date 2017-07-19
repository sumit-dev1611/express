var express = require('express');
var router = express();
var md5 = require('md5')
var validation = require('./validation');

router.post('/user/register/', function(req, res, next) {
    validation.validateRegistration(req.body, function(err, data) {
        if (err) {
            next(err);
        } else {
            var detail = new req.users_collection({
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
            req.users_collection.findOne({ username: data.username, password: data.password }, function(err, users_data) {
                if (err) {
                    next(err);
                } else if (users_data) {
                    req.access_token_collection.findOne({ user_id: users_data._id }, function(err, access_token_data) {
                        if (err) {
                            next(err);
                        } else if (access_token_data) {
                            var expiryDate = new Date();
                            expiryDate.setHours(expiryDate.getHours() + 1);
                            req.access_token_collection.findOneAndUpdate({ user_id: access_token_data.user_id }, {
                                    $set: {
                                        expiry: expiryDate
                                    }
                                },
                                function(err, data) {
                                    if (err) {
                                        next(err);
                                    } else {
                                        res.json(data)
                                    }
                                });
                        } else {
                            var expiryDate = new Date();
                            expiryDate.setHours(expiryDate.getHours() + 1);
                            var access_Detail = new req.access_token_collection({
                                user_id: users_data._id,
                                access_token: md5(new Date()),
                                expiry: expiryDate
                            });
                            access_Detail.save(function(err, data) {
                                if (err) {
                                    next(err);
                                } else {
                                    res.json(data)
                                }
                            });
                        }
                    });
                } else {
                    res.json('Not a user !!!     Get registered')
                }
            });
        }
    });
});


router.get('/user/get/:access_token', function(req, res, next) {
    req.users_collection.findOne({ _id: req.params.access_token }, function(err, data) {
        if (err) {
            next(err);
        } else if (data) {
            res.json(data)
        } else {
            res.json('data not found');
        }
    });
});


router.all('/user/delete/:access_token', function(req, res, next) {
    req.users_collection.remove({ "_id": req.params.access_token }, function(err, result) {
        if (err) {
            next(err);
        } else {
            res.json('data deleted');
        }
    });
});

router.get('/user/list/:page', function(req, res, next) {
    req.users_collection.find({}).skip((req.params.page) * 10).limit(10).exec(function(err, data) {
        if (err) {
            next(err);
        } else if (data) {
            res.json(data);
        } else {
            res.json("data can't be fetched....ERROR !! ")
        }
    });
});

module.exports = router;