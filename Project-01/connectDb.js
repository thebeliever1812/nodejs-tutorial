const mongoose = require("mongoose");

async function connectMongoDb(url) {
	try {
		await mongoose.connect(url);
		console.log("MongoDb connected");
	} catch (error) {
		console.log(`Error Connecting MongoDb: ${error}`);
	}
}

module.exports = connectMongoDb;
