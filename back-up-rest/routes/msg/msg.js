var method = {
    send: function (msg, mobile) {
//		return "verify";
        var request = require("request");
        request("http://sumit.bulksmsnagpur.net/sendunicodesms?uname=sbarti&pwd=sbarti&senderid=HLTFIN&to=" + mobile + "&msg=" + msg + "&route=T", function (msgError, response, body) {
            if (msgError) {
                console.error('Message error: ', msgError);
                return next(msgError);
            }
        });
    }
};

exports.method = method;