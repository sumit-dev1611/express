var express = require('express'); // require express module
var app = express(); // creatig insatnce of express function
var bodyParser = require('body-parser'); // required body-parser module
var routes = require('./routes/index.js'); // create route for index
var db = require('./mongodb/db.js')
app.use(db())
app.use(bodyParser.urlencoded({ // getting the data from url
    extended: true
}));
app.use('/', routes);


app.listen(3015, function() {
    console.log("Server started at port number: 3015");
});
