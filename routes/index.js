var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

router.post('/form/:name', function(req, res, next) {
    //console.log(req.params)
    // console.log("gdcfs");
    //console.log(req.body)
    // json_data = { "name": "amita", "pass": "12345" }
    var detail = new req.fetch({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    detail.save(function(err, data) {
            if (err)
                console.log(err)
            res.json('Data Inserted')
            console.log(data)

        })
        // res.json(json_data)

});


// });
module.exports = router;
