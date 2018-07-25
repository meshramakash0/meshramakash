//Rest Api for various Login details.
var express = require('express');
var session = require('express-session');
var router = express.Router();

var app = express();

app.use(session({secret: 'healthfinparson', saveUninitialized: true, resave: true}));

/* Create Employee login. */
router.post('/', function (req, res, next) {
    try {

//        This method is used for getting the data from form with x-www-form-url-encoded format
        var reqObj = req.body;
        var loginType = reqObj.loginType;
        var mobile = reqObj.mobile;
        var password = reqObj.password;

//        This method is used for getting the data from url with 'url?variable = value' format 
//        var username = req.param('username');
//        var password = req.param('password');

//      Login condition for employee.
        if (loginType == "employee") {
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from hf_emp where mobile = ? and password = ?', [mobile, password], function (err, rows) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        var data = {};
                        var empObj = {};
                        for (var empIndex in rows) {
                            empObj = rows[empIndex];
                            resEmp.push(empObj);
                        }

                        if (empObj.mobile === mobile && empObj.password === password) {
                            req.session.sessionId = empObj.id;
                            data.sessionId = req.session.sessionId;
                            data.success = "true";
                            data.message = "You have successfully login.";
                        } else {
                            data.success = "false";
                            data.message = "You have entered incorrect mobile number or password.";
                        }
                        data.data = resEmp

                        res.json(data);

                    });
                }
            });
        }

//      Login condition for user.
        if (loginType == "user") {
            req.getConnection(function (err, conn) {
                if (err) {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                } else {
                    conn.query('select * from hf_usr where mobile = ? and password = ?', [mobile, password], function (err, rows) {
                        if (err) {
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        var resEmp = [];
                        var data = {};
                        var empObj = {};
                        for (var empIndex in rows) {
                            empObj = rows[empIndex];
                            resEmp.push(empObj);
                        }

                        if (empObj.mobile === mobile && empObj.password === password) {
                            req.session.sessionId = empObj.id;
                            data.sessionId = req.session.sessionId;
                            data.success = "true";
                            data.message = "You have successfully login.";
                        } else {
                            data.success = "false";
                            data.message = "You have entered incorrect mobile number or password.";
                        }
                        data.data = resEmp

                        res.json(data);

                    });
                }
            });
        }

    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});


module.exports = router;