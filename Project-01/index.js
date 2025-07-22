const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
	return res.json(users);
});

// Get users with id
app.get("/api/users/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((user) => user.id === id);
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
	return res.json(user);
});

// POST create user
app.post("/api/users", (req, res) => {
	res.json({ status: "Pending" });
});

// PATCH edit user
app.patch("/api/users/:id", (req, res) => {
	res.json({ status: "Pending" });
});

// DELETE delete user
app.delete("/api/users/:id", (req, res) => {
	res.json({ status: "Pending" });
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
