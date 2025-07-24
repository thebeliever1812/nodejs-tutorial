const express = require("express");
const router = express.Router();
const {
	handleGetAllUsers,
	handleCreateNewUser,
	handleGetUserById,
	handleEditUserById,
	handleDeleteUserById,
} = require("../controllers/user");

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
	.route("/:id")
	.get(handleGetUserById)
	.patch(handleEditUserById)
	.delete(handleDeleteUserById);

module.exports = router;
