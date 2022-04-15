const User = require('../models/User');

const addUser = async (req, res) => {
    // router.route("/").post(addUser);
    const { user_name, email, phone, role } = req.body;
    const newUser = new User({ user_name, email, phone, role });
    await newUser.save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
};

const getAllUsers = async (req, res) => {
    // router.route("/").get(getAllUsers);

    const requester = await User.findById(req.body.userId)

    if (requester.role == 'admin') {
        await User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    } else {
        res.json({ message: 'You are not admin' });
    }
}

const getUserById = async (req, res) => {
    // router.route("/:id").get(getUserById);
    await User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

const updateUserById = async (req, res) => {
    // router.route("/:id").put(updateUserById);
    const requester = await User.findById(req.body.userId)
    if (requester._id == req.params.id || requester.role == 'admin') {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(user => res.json(user))
            .catch(err => res.json(err));
    } else {
        res.json({ message: 'You are not authorized.' });
    }
}

const deleteUserById = async (req, res) => {
    // router.route("/:id").delete(deleteUserById);
    const requester = await User.findById(req.body.userId)
    if (requester._id == req.params.id || requester.role == 'admin') {
        await User.findByIdAndDelete(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    } else {
        res.json({ message: 'You are not authorized.' });
    }
}

module.exports = { addUser, getAllUsers, getUserById, updateUserById, deleteUserById };