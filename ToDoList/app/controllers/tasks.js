const Task = require('../models/Task');
const User = require('../models/User');

const getAll = async (req, res) => {
    // router.route("/").get(getAll);

    // const requester = await User.findById(req.body.user)

    // const { category, title } = req.query;
    // if (!category && !title) {
    //     if (requester.role == 'admin') {
    //         var tasks = await Task.find().sort({ date: 1 })
    //             .then(response => res.json(response))
    //             .catch(err => res.json(err));
    //     } else {
    //         var tasks = await Task.find({ user: requester._id }).sort({ date: 1 })
    //             .then(response => res.json(response))
    //             .catch(err => res.json(err));
    //     }
    // }
    // else if (category && !title) {
    //     var taskQuery = await Task.find(
    //         { category: { $regex: category, $options: 'i' } }
    //     ).sort({ date: 1 })
    //         .then(response => res.json(response))
    //         .catch(err => res.json(err));
    // }
    // else if (!category && title) {
    //     var taskQuery = await Task.find(
    //         { title: { $regex: title, $options: 'i' } }
    //     ).sort({ date: 1 })
    //         .then(response => res.json(response))
    //         .catch(err => res.json(err));
    // } else {
    //     var taskQuery = await Task.find({
    //         $and:
    //             [
    //                 { category: { $regex: category, $options: 'i' } },
    //                 { title: { $regex: title, $options: 'i' } }
    //             ]
    //     }).sort({ date: 1 })
    //         .then(response => res.json(response))
    //         .catch(err => res.json(err));
    // }

}
const getById = async (req, res) => {
    // router.route("/:id").get(getById);
    var task = await Task.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.json(err));
}
const add = async (req, res) => {
    // router.route("/").post(add);
    var task = {
        user: req.body.user,
        title: req.body.title,
        complete: req.body.complete,
        category: req.body.category
    };

    var newTask = await Task.create(task)
        .then(response => res.json(response))
        .catch(err => res.json(err));
}
// const updateById = async (req, res) => {
//     // router.route("/:id").put(updateById);
//     var updatedTask = {
//         user_name: req.body.user_name,
//         title: req.body.title,
//         complete: req.body.complete,
//         category: req.body.category
//     }
//     const updated = await Task.findByIdAndUpdate(req.params.id, updatedTask, { new: true })
//         .then(response => res.json(response))
//         .catch(err => res.json(err));
// }

const markDone = async (req, res) => {
    // router.route("/mark/:id").put(markDone);
    var updatedTask = {
        complete: !(await Task.findById(req.params.id)).complete
    }

    const marked = await Task.findByIdAndUpdate(req.params.id, updatedTask, { new: true })
        .then(response => res.json(response))
        .catch(err => res.json(err));
}

const deleteById = async (req, res) => {
    // router.route("/:id").delete(deleteById);
    var deleted = await Task.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.json(err));
}

module.exports = { getAll, getById, add, deleteById, markDone }