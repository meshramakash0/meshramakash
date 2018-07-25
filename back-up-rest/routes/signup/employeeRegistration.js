//Rest Api for new registrations for user's.
var express = require('express');
var session = require('express-session');
var router = express.Router();

var resEmp = [];
var empObj = {};
var data = {};

/* Create user's registration. */
router.post('/registration', function (req, res, next) {
    try {

        var sqlSelect = 'SELECT username  FROM hf_employee WHERE username = ? and password = ?';
        var sqlInsert = 'INSERT INTO hf_employee SET ?';

//        This method is used for getting the data from form with x-www-form-url-encoded format
        var reqObj = req.body;

        var insertValues = {
            "username": reqObj.username,
            "password": reqObj.password,
            "regdate": reqObj.regdate,
            "name": reqObj.name,
            "role": reqObj.role,
            "isActive": reqObj.isActive,
            "mobile": reqObj.mobile
        };

        req.getConnection(function (err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query(sqlSelect, [reqObj.username, reqObj.password], function (err, rows, fields) {
                    resEmp = [];
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    for (var empIndex in rows) {
                        empObj = rows[empIndex];
                    }

                    if (empObj.username === reqObj.username) {
                        data.success = "false";
                        data.message = "User already exists";
                        resEmp.push(data);

                        res.json(resEmp);

                    } else {
                        conn.query(sqlInsert, insertValues, function (err, rows) {

                            if (err) {
                                console.error('SQL error: ', err);
                                return next(err);
                            } else {
                                var employeeId = res.insertId;
                                data.success = "true";
                                data.message = "Successfully registered";
                                data.employeeId = employeeId;
                                resEmp.push(data);
                            }

                            res.json(resEmp);
                        });
                    }
                });

//                resEmp.push(empObj.username);

            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
module.exports = router;
