var method = {
	create: function() {
		return (Math.floor(100000 + Math.random() * 900000));
	},
	send: function() {
		return "verify";
	},
        resend: function() {
		return "resend";
	}
};

exports.method = method;