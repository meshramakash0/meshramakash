//Rest Api for new registrations for user's and employees .
var express = require('express');
var session = require('express-session');
var router = express.Router();

var app = express();

app.use(session({secret: 'healthfinparson', saveUninitialized: true, resave: true}));

var empObj = {};
var data = {};

/* Create Employee login. */
router.post('/', function (req, res, next) {
    try {

//        This method is used for getting the data from form with x - www - form - url - encoded format
        var reqObj = req.body;
        var loginType = reqObj.loginType;
        var name = reqObj.name;
        var mobile = reqObj.mobile;

//      Condition for employe sign-up
        if (loginType == "employee") {
            var sqlInsert = 'INSERT INTO hf_emp SET ?';
            var sqlSelect = 'SELECT username  FROM hf_emp WHERE username = ? and password = ?';

            req.getConnection(function (connErr, conn) {
                if (connErr) {
                    console.error('SQL Connection error: ', connErr);
                    return next(connErr);
                } else {
//        This method is used for getting the data from form with x-www-form-url-encoded format
                    var insertValues = {
                        "username": reqObj.username,
                        "password": reqObj.password,
                        "created_date": reqObj.regDate,
                        "first_name": reqObj.firstName,
                        "middle_name": reqObj.middleName,
                        "last_name": reqObj.lastName,
                        "role": reqObj.role,
                        "is_active": reqObj.isActive,
                        "mobile": reqObj.mobile,
                        "email": reqObj.email
                    };
                    conn.query(sqlSelect, [reqObj.username, reqObj.password], function (selectConnErr, rows) {
                        resEmp = [];
                        if (selectConnErr) {
                            console.error('SQL error: ', selectConnErr);
                            return next(selectConnErr);
                        }
                        for (var empIndex in rows) {
                            empObj = rows[empIndex];
                        }

                        if (empObj.username === reqObj.username) {
                            data.success = "false";
                            data.message = "Employee already exists";
                            resEmp.push(data);

                            return res.json(resEmp);

                        } else {
                            conn.query(sqlInsert, insertValues, function (insertConnErr) {

                                if (insertConnErr) {
                                    console.error('SQL error: ', insertConnErr);
                                    return next(insertConnErr);
                                } else {
                                    var employeeId = res.insertId;
                                    data.success = "true";
                                    data.message = "Employee Successfully registered";
                                    data.employeeId = employeeId;
                                    resEmp.push(data);
                                }

                                return res.json(resEmp);
                            });
                        }
                    });
                }
            });
        } else
//      Condition for user sign-up
        if (loginType == "user") {
            var sqlInsert = 'INSERT INTO hf_usr SET ?';
            var sqlSelect = 'SELECT mobile, password  FROM hf_usr WHERE mobile = ?';

            req.getConnection(function (connErr, conn) {
                if (connErr) {
                    console.error('SQL Connection error: ', connErr);
                    return next(connErr);
                } else {

                    if (name == "" || name == undefined || name == null) {
                        resEmp = [];
                        data.success = "false";
                        data.message = "Please specify the name.";
                        resEmp.push(data);

                        return res.json(resEmp);
                    }
                    if (mobile == "" || mobile == undefined || mobile == null) {
                        resEmp = [];
                        data.success = "false";
                        data.message = "Please specify the mobile number.";
                        resEmp.push(data);

                        return res.json(resEmp);
                    }


                    var dateTime = require('node-datetime');
                    var dt = dateTime.create().format('Y-m-d H:M:S');

                    otp = require('../otp/otp');
                    otpValue = otp.method.create();

                    var ip = req.connection.remoteAddress;
                    console.log(ip);

//        This method is used for getting the data from form with x-www-form-url-encoded format                    
                    var insertValues = {
                        "name": name,
                        "mobile": mobile,
                        "email": reqObj.email,
                        "create_date": dt,
                        "otp": otpValue,
                        "otp_date_time": dt,
                        "ip_address": ip,
                        "browser_details": reqObj.browserDetails,
                        "avatar": reqObj.avatar,
                        "api_key": reqObj.apiKey
                    };
                    conn.query(sqlSelect, [mobile], function (selectConnErr, rows) {
                        resEmp = [];
                        if (selectConnErr) {
                            console.error('SQL error: ', selectConnErr);
                            return next(selectConnErr);
                        }
                        for (var empIndex in rows) {
                            empObj = rows[empIndex];
                        }

                        if (empObj.mobile === mobile) {

                            if (empObj.mobile === mobile && empObj.password === "") {
                                data.success = "false";
                                data.message = "User already registered please proceed to set the password.";
                                resEmp.push(data);

                                return res.json(resEmp);

                            } else {
                                data.success = "false";
                                data.message = "User already exists please proceed to login.";
                                resEmp.push(data);

                                return res.json(resEmp);
                            }
                        } else {
                            conn.query(sqlInsert, insertValues, function (insertConnErr, result) {

                                if (insertConnErr) {
                                    console.error('SQL error: ', insertConnErr);
                                    return next(insertConnErr);
                                } else {
                                    var msg = "Your OTP is " + otpValue;
                                    sendMesssage = require('../msg/msg');
                                    sendMesssage.method.send(msg, mobile);

                                    var userId = result.insertId;
                                    data.success = "true";
                                    data.message = "User Successfully registered and otp is sent to the user for verification.";
                                    data.userId = userId;
                                    resEmp.push(data);
                                }

                                return res.json(resEmp);
                            });
                        }
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
