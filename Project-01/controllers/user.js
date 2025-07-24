const User = require("../models/user");

async function handleGetAllUsers(req, res) {
	try {
		const allUsers = await User.find({});
		if (!allUsers) {
			return res.status(404).json({ error: "Users not found" });
		}
		res.status(200).json(allUsers);
	} catch (error) {
		console.log(`Error in get all users: ${error}`);
		res.status(500).json({ error: error });
	}
}

async function handleCreateNewUser(req, res) {
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
}

async function handleGetUserById(req, res) {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

async function handleEditUserById(req, res) {
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
}

async function handleDeleteUserById(req, res) {
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
}

module.exports = {
	handleGetAllUsers,
	handleCreateNewUser,
	handleGetUserById,
	handleEditUserById,
	handleDeleteUserById,
};
