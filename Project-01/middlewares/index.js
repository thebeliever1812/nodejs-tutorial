const fs = require("fs");

function logReqRes(fileName) {
	return (req, res, next) => {
		const log = `\nRequested on ${Date.now()} of ${req.method} ${req.path}`;
		fs.appendFile(fileName, log, (err) => {
			if (err) {
				return res.status(500).json({ status: "Failed" });
			}
			next();
		});
	};
}

module.exports = { logReqRes };
