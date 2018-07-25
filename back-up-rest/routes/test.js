//var express = require('express');
////var session = require('express-session');
////var bodyParser = require('body-parser');
//var router = express.Router();
//
//var app = express();
//
///* GET home page. */
////router.get('/', function (req, res, next) {
////    res.send('respond with a resource user ' + req.session.email);
////
////});
//
///* Get Employee Service. */
//router.get('/healthfin/v2/getEmployeeDetails', function (req, res, next) {
//    try {
//        var password = req.param('password');
//        var name = req.param('name'); /*var query = url.parse(req.url,true).query; console.log(query); var name = query.name; var password = query.password;*/
////        console.log(password);
////        console.log(name);
//        req.getConnection(function (err, conn) {
//            if (err) {
//                console.error('SQL Connection error: ', err);
//                return next(err);
//            } else {
//                conn.query('select * from employee where password = ? and name = ?', [password, name], function (err, rows, fields) {
//                    if (err) {
//                        console.error('SQL error: ', err);
//                        return next(err);
//                    }
//                    var resEmp = [];
//                    var empObj = {};
//                    for (var empIndex in rows) {
//                        empObj = rows[empIndex];
//                        resEmp.push(empObj);
//                    }
//                    
//                    var test = req.session.email;
//                    resEmp.push(test);
//                    res.json(resEmp);
//
//                });
//            }
//        });
//    } catch (ex) {
//        console.error("Internal error:" + ex);
//        return next(ex);
//    }
//});
//
//
//module.exports = router;