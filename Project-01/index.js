const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connect to mongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/node-user-app")
	.then(() => console.log("Database connected"))
	.catch((error) => console.log(`Error : ${error}`));

// Schema
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: false,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);

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
app.get("/users", async (req, res) => {
	const allUsers = await User.find({});
	const html = `<ul>
        ${allUsers
					.map(
						(user) =>
							`<li>Name: ${user.firstName} ${user.lastName} and Email: ${user.email}</li>`
					)
					.join("")}
    </ul>`;
	return res.send(html);
});
// For Mobile users we return json
app.get("/api/users", async (req, res) => {
	// res.setHeader("X-MyName", "Basir Malik"); // custom response header, always add X in starting in custom header
	// console.log(req.headers) // gives the request headers
	const allUsers = await User.find({});
	res.status(200).json(allUsers);
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
app.post("/api/users", async (req, res) => {
	// req.body ke andar vo data aa jaega jo hamne post request se bheja h
	const body = req.body;
	if (
		!body ||
		!body.first_name ||
		!body.last_name ||
		!body.age ||
		!body.gender ||
		!body.email
	) {
		return res.status(400).json({ error: "All fields required" });
	}
	const newUser = await User.create({
		firstName: body.first_name,
		lastName: body.last_name,
		age: body.age,
		gender: body.gender,
		email: body.email,
	});

	return res.status(201).json({ status: "User created", addedUser: newUser });
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
	.get(async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	})
	.patch(async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});

			if (!user) return res.status(404).json({ error: "User not found" });

			res
				.status(200)
				.json({ status: "User updated successfully", updatedUser: user });
		} catch (error) {
			console.error("Update Error:", error.message);
			res.status(500).json({ error: "Internal Server Error" });
		}
	})
	.delete(async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			res
				.status(200)
				.json({ status: "User deleted successfully", deletedUser: user });
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
