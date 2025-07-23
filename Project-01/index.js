const express = require("express");
const fs = require("fs");
let users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	fs.appendFile(
		"./log.txt",
		`\nRequested on ${Date.now()} of ${req.method} ${req.path}`,
		(err) => {
			if (err) {
				return res.status(500).json({ status: "Failed" });
			}
			next();
		}
	);
});

// app.use((req, res, next) => {
// 	console.log("Hello Middleware 2");
// 	console.log(req.userName)
// 	res.end("Request Rejected")
// 	// next()
// });

// Routes

// Get all users (Make hybrid server means for both mobile and browser users)
// For browser users, we return html doc
app.get("/users", (req, res) => {
	const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
	return res.send(html);
});
// For Mobile users we return json
app.get("/api/users", (req, res) => {
	res.setHeader("X-MyName" , "Basir Malik") // custom response header, always add X in starting in custom header
	// console.log(req.headers) // gives the request headers
	return res.json(users);
});

// Get users with id
// app.get("/api/users/:id", (req, res) => {
// 	const id = Number(req.params.id);
// 	const user = users.find((user) => user.id === id);
// 	if (!user) {
// 		return res.status(404).json({ error: "User not found" });
// 	}
// 	return res.json(user);
// });

// POST create user
app.post("/api/users", (req, res) => {
	// req.body ke andar vo data aa jaega jo hamne post request se bheja h
	const body = req.body;
	users.push({ id: users.length + 1, ...body });
	fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
		return res.json({ status: "Success", id: users.length });
	});
});

// // PATCH edit user
// app.patch("/api/users/:id", (req, res) => {
// 	res.json({ status: "Pending" });
// });

// // DELETE delete user
// app.delete("/api/users/:id", (req, res) => {
// 	res.json({ status: "Pending" });
// });

app
	.route("/api/users/:id")
	.get((req, res) => {
		const id = Number(req.params.id);
		const user = users.find((user) => user.id === id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json(user);
	})
	.patch((req, res) => {
		const id = Number(req.params.id);
		const user = users.find((user) => user.id === id);
		if (!user) {
			return res.json({ error: "404 not found" });
		}

		Object.assign(user, req.body);

		fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
			if (err) {
				return res.status(500).json({ error: "Failed to update user" });
			}
			return res.json({ status: "Success", updatedUser: user });
		});
	})
	.delete((req, res) => {
		const id = Number(req.params.id);
		const userIndex = users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			return res.status(404).json({ error: "User not found" });
		}

		const deletedUser = users.splice(userIndex, 1);

		fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
			if (err) {
				return res.status(500).json({ status: "User not deleted" });
			}
			return res.json({
				status: "User deleted successfully",
				deletedUser: deletedUser,
			});
		});
	});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
