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
        var mobile = reqObj.mobile;
        var password = reqObj.password;

        var sqlUpdate = 'UPDATE hf_usr SET password = ? WHERE mobile = ?';

        req.getConnection(function (connErr, conn) {
            if (connErr) {
                console.error('SQL Connection error: ', connErr);
                return next(connErr);
            } else {
                conn.query(sqlUpdate, [password, mobile], function (insertConnErr, result) {
                    resEmp = [];
                    if (insertConnErr) {
                        console.error('SQL error: ', insertConnErr);
                        return next(insertConnErr);
                    } else {
                        var userId = result.insertId;
                        data.success = "true";
                        data.message = "Your password is successfully updated.";
                        resEmp.push(data);
                    }

                    return res.json(resEmp);
                });
            }
        });

    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
module.exports = router;
