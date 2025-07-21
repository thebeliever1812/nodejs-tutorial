const http = require("http");
const fs = require("fs");
const { URL } = require("url");

const myServer = http.createServer((req, res) => {
	// console.log("New request received");
	// console.log(req.url)
	// console.log(req.method)
	// console.log(req.socket.remoteAddress) // For IP address

	if (req.url === "/favicon.ico") return res.end();

	const ip = req.socket.remoteAddress;
	const clientIp = ip === "::1" ? "127.0.0.1" : ip;

	const log = `Request Recieved from ${clientIp} of ${req.method} ${
		req.url
	} on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n`;

	fs.appendFile("./data.txt", log, (err) => {
		if (err) console.log(err);
	});

	const myUrl = new URL(req.url, `http://${req.headers.host}`);
	// console.log(myUrl)

	switch (myUrl.pathname) {
		case "/":
			if (req.method === "GET") {
				res.end("Hello from Server");
			}
			break;
		case "/about":
			const name = myUrl.searchParams.get("name");
			const userId = myUrl.searchParams.get("userId");
			res.end(`Hii, I am ${name} and my user ID is ${userId}`);
			break;
		case "/signup":
			if (req.method === "GET") {
				res.end("This is the Signup page");
			} else if (req.method === "POST") {
				// DB query
				res.end("Submission successful");
			}
			break;
		default:
			res.end("Error 404: Not Found");
			break;
	}
});

myServer.listen(8000, () => {
	console.log("ServerStarted");
});
