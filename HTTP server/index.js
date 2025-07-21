const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
	// console.log("New request received");
	// console.log(req.url)
	// console.log(req.method)
	// console.log(req.socket.remoteAddress) // For IP address

	const ip = req.socket.remoteAddress;
	const clientIp = ip === "::1" ? "127.0.0.1" : ip;

	const log = `Request Recieved from ${clientIp} of ${
		req.url
	} on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n`;

	fs.appendFile("./data.txt", log, (err) => {
		if (err) console.log(err);
	});

	switch (req.url) {
		case "/":
			res.end("Hello from Server");
			break;
		case "/about":
			res.end("I am Basir Ahmad");
			break;
		default:
			res.end("Error 404: Not Found");
			break;
	}
});

myServer.listen(8000, () => {
	console.log("ServerStarted");
});
