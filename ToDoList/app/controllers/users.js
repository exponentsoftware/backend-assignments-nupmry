const User = require('../models/User');
const bcrypt = require("bcryptjs")
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../utils/authenticate");
const jwt = require("jsonwebtoken")

const logout = async (req, res) => {
    // const { signedCookies = {} } = req
    const { refreshToken } = req.signedCookies
    User.findById(req.user._id).then(
        user => {
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )
            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.send({ success: true })
                }
            })
        },
        err => next(err)
    )
}

const refreshToken = async (req, res) => {
    // const { signedCookies = {} } = req
    const { refreshToken } = req.signedCookies

    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            User.findOne({ _id: userId }).then(
                user => {
                    if (user) {
                        const tokenIndex = user.refreshToken.findIndex(
                            (item) => item.refreshToken === refreshToken
                        )
                        if (tokenIndex === -1) {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        } else {
                            const token = getToken({ _id: userId })
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500
                                    res.send(err)
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({ success: true, token })
                                }
                            })
                        }
                    } else {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

const login = async (req, res) => {
    // const { email, password } = req.body;
    // await User.findOne({ email })
    //     .then(user => {
    //         if (bcrypt.compare(password, user.password)) {
    //             console.log("success")
    //             res.json(user);
    //         } else {
    //             res.json({ message: 'Incorrect Credentials!' });
    //         }
    //     })
    //     .catch(err => res.json(err));

    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
        (user) => {
            user.refreshToken.push({ refreshToken })
            console.log("login entered")
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                    res.send({ success: true, token })
                }
            })
        },
        err => next(err)
    )
}

const register = async (req, res) => {
    const { username, phone, password } = req.body;
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
        // const newUser = new User({ user_name, email, phone, password });
        // await newUser.save()
        //     .then(user => res.json(user))
        //     .catch(err => res.json(err));
        User.register(
            new User({ username, phone, password }),
            password,
            (err, user) => {
                if (err) {
                    console.log("register entered")
                    res.statusCode = 500
                    res.send(err)
                } else {
                    // user.username = req.body.username
                    // user.email = req.body.email
                    // user.phone = req.body.phone
                    const token = getToken({ _id: user._id })
                    const refreshToken = getRefreshToken({ _id: user._id })
                    user.refreshToken.push({ refreshToken })
                    console.log("register entered")
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500
                            res.send(err)
                        } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.send({ success: true, token })
                        }
                    })
                }
            }
        )
    } else {
        res.json({ message: 'User already exists' });
    }
}

// const addUser = async (req, res) => {
//     // router.route("/").post(addUser);
//     const { user_name, email, phone, role } = req.body;
//     const newUser = new User({ user_name, email, phone, role });
//     await newUser.save()
//         .then(user => res.json(user))
//         .catch(err => res.json(err));
// };

// const getAllUsers = async (req, res) => {
//     // router.route("/").get(getAllUsers);

//     const requester = await User.findById(req.body.userId)

//     if (requester.role == 'admin') {
//         await User.find()
//             .then(users => res.json(users))
//             .catch(err => res.json(err));
//     } else {
//         res.json({ message: 'You are not admin' });
//     }
// }

// const getUserById = async (req, res) => {
//     // router.route("/:id").get(getUserById);
//     await User.findById(req.params.id)
//         .then(user => res.json(user))
//         .catch(err => res.json(err));
// }

// const updateUserById = async (req, res) => {
//     // router.route("/:id").put(updateUserById);
//     const requester = await User.findById(req.body.userId)
//     if (requester._id == req.params.id || requester.role == 'admin') {
//         await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
//             .then(user => res.json(user))
//             .catch(err => res.json(err));
//     } else {
//         res.json({ message: 'You are not authorized.' });
//     }
// }

// const deleteUserById = async (req, res) => {
//     // router.route("/:id").delete(deleteUserById);
//     const requester = await User.findById(req.body.userId)
//     if (requester._id == req.params.id || requester.role == 'admin') {
//         await User.findByIdAndDelete(req.params.id)
//             .then(user => res.json(user))
//             .catch(err => res.json(err));
//     } else {
//         res.json({ message: 'You are not authorized.' });
//     }
// }

module.exports = { login, register, refreshToken, logout }