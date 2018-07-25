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
        var mobile = reqObj.mobile;

//      otp verification
        if (loginType == "otpVerification") {
            var sqlSelect = 'SELECT otp  FROM hf_usr WHERE mobile = ?';

            req.getConnection(function (connErr, conn) {
                if (connErr) {
                    console.error('SQL Connection error: ', connErr);
                    return next(connErr);
                } else {
                    conn.query(sqlSelect, [mobile], function (selectConnErr, rows) {
                        resEmp = [];
                        if (selectConnErr) {
                            console.error('SQL error: ', selectConnErr);
                            return next(selectConnErr);
                        }
                        for (var empIndex in rows) {
                            empObj = rows[empIndex];
                        }

                        if (empObj.otp === reqObj.otp) {
                            data.success = "true";
                            data.message = "Your Otp is verified successfully please proceed to set the password.";
                            resEmp.push(data);

                            return res.json(resEmp);

                        } else {
                            data.success = "false";
                            data.message = "Your Otp did not matched. Please resend the otp.";
                            resEmp.push(data);

                            return res.json(resEmp);
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
