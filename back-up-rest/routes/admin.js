var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:loanId', function (req, res, next) {
    var loanId = req.param('loanId');
    res.send(loanId);
    
});


module.exports = router;