var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var passport = require('passport');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app);
