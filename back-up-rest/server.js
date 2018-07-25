var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = require("express-myconnection");

var app = express();

dbDetails = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'healthfin'
};

//dbDetails = {
//    host: '182.50.13.77',
//    user: 'scketonc_health',
//    password: 'nagpur1234',
//    port: 3306,
//    database: 'mediloan'
//};

//Creates mysql connection with single, pool, request strategy.
app.use(connection(mysql, dbDetails, 'single'));

//var test = require('./routes/test');
//var testAdmin = require('./routes/admin');
var bank = require('./routes/banks/bank');
var city = require('./routes/cities/city');
var employee = require('./routes/employees/employee');
var hospital = require('./routes/hospitals/hospital');
var loan = require('./routes/loans/loan');
var login = require('./routes/login/login');
var signup = require('./routes/signup/signup');
var otpVerication = require('./routes/otp/otpVerification');
var setPassword = require('./routes/setPassword/setPassword');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'healthfinparson', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/testLogin', test);
//app.use('/testAdmin', testAdmin);
app.use('/banks', bank);
app.use('/cities', city);
app.use('/employees', employee);
app.use('/hospitals', hospital);
app.use('/loans', loan);
app.use('/login', login);
app.use('/signup', signup);
app.use('/otpVerication', otpVerication);
app.use('/setPassword', setPassword);

var sess;

app.use('/', function (req, res) {
    sess = req.session;
    if (sess.sessionId)
    {
        res.redirect('/admin');
    } else {
        res.render('index.html');
    }
});

app.get('/admin',function(req,res){
	sess=req.session;
	if(sess.sessionId)	
	{
		res.write('<h1>Hello '+sess.sessionId+'</h1><br>');
		res.end('<a href='+'/logout'+'>Logout</a>');
	}
	else
	{
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/'+'>Login</a>');
	}

});

app.get('/logout', function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else
        {
            res.redirect('/');
        }
    });

});


app.listen(3000, function () {
    console.log("App Started on PORT 3000");
});

module.exports = app;
