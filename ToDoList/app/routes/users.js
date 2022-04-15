const express = require('express');
const router = express.Router();

const { addUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/users');

router.route("/").post(addUser);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUserById);
router.route("/:id").delete(deleteUserById);

module.exports = router;