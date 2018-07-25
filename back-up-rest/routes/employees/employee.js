//Rest Api for accessing the Employee details.
var express = require('express');
var router = express.Router();

var app = express();

/* Get All employee Service. */
router.get('/', function (req, res, next) {
    try {
//        var password = req.param('password');
//        var name = req.param('name'); /*var query = url.parse(req.url,true).query; console.log(query); var name = query.name; var password = query.password;*/

        req.getConnection(function (err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('select * from hf_employee', function (err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    var empObj = {};
                    for (var empIndex in rows) {
                        empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }

                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

/* Get employee by id */
router.get('/:id', function (req, res, next) {
    try {
        var id = req.param('id');
//        var name = req.param('name'); /*var query = url.parse(req.url,true).query; console.log(query); var name = query.name; var password = query.password;*/

        req.getConnection(function (err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('select * from hf_employee where id = ?', [id], function (err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    var empObj = {};
                    for (var empIndex in rows) {
                        empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }

                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});


module.exports = router;