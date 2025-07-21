const fs = require("fs"); // fs stands for file system
const os = require("os");

// Syncronous
// fs.writeFileSync('./test.txt', 'This is a test file')

// Asyncronous
// fs.writeFile('./test.txt', 'This is a file', (err) => {})

// Syncronous
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// Asyncronous (it doesnot return anything like the sync and this is same for fs.writeFile as well)
// fs.readFileSync("./contacts.txt", "utf-8", (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	} else console.log(result);
// });

// fs.appendFileSync("./test.txt", `\nNew Text appended`)

// To copy any file
// fs.cpSync('./contacts.txt', './copy.txt')

// To delete any file
// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync("./test.txt"))

// To create folders
// fs.mkdirSync("my-docs");
// fs.mkdirSync("your-docs/a/b", { recursive: true });

// Blocking requests
// console.log("1");
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);
// console.log("2");

// Non-Blocking requests
// console.log("1");
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
// 	console.log(result);
// });
// console.log("2");

console.log(os.cpus().length)
