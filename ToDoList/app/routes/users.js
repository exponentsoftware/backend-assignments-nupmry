const express = require('express');
const router = express.Router();
const passport = require("passport")
const { register, login, refreshToken, logout, registeredToday, activeToday, addUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/users');
const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../../utils/authenticate")

router.route("/register").post(register);
router.route("/login").post(passport.authenticate("local"), login);
router.route("/refreshToken").post(refreshToken)
router.route("/logout").get(verifyUser, logout);
router.get("/registered_today", registeredToday)
router.get("/active_today", activeToday)
// router.route("/").post(addUser);
// router.route("/").get(getAllUsers);
// router.route("/:id").get(getUserById);
// router.route("/:id").put(updateUserById);
// router.route("/:id").delete(deleteUserById);

module.exports = router;