var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var db = require('./mongodb/db.js')
app.use(db())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', routes);

app.listen(3015, function() {
    console.log("Server started at port number: 3015");
});
