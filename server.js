var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//connection string for local server
var connectionString = 'mongodb://127.0.0.1:27017/webdevAssignment';

// Connection string for remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {

    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                       process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                       process.env.OPENSHIFT_APP_NAME;
}

//connect to database
var db = mongoose.connect(connectionString);


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.listen(port, ipaddress);

require("./public/assignment/server/app.js")(app,db,mongoose);

