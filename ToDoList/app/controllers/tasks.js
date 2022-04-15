const Todo = require('../models/ToDo');

const getAll = async (req, res) => {
    // router.route("/").get(getAll);
    const { category, title } = req.query;
    if (!category && !title) {
        var tasks = await Todo.find().sort({ date: 1 });
        res.json(tasks);
    } else {
        var taskQuery = await Todo.find({
            $and: [
                { category: { $eq: category } },
                { title: { $eq: title } }
            ]
        }).sort({ date: 1 })
        res.json(taskQuery)
    }

}
const getById = async (req, res) => {
    // router.route("/:id").get(getById);
    var task = await Todo.findById(req.params.id);
    res.json(task);
}
const add = async (req, res) => {
    // router.route("/").post(add);
    var task = {
        user_name: req.body.user_name,
        title: req.body.title,
        complete: req.body.complete,
        category: req.body.category
    };

    var newTask = await Todo.create(task);
    res.json(newTask);
}
const updateById = async (req, res) => {
    // router.route("/:id").put(updateById);
    var updatedTask = {
        user_name: req.body.user_name,
        title: req.body.title,
        complete: req.body.complete,
        category: req.body.category
    }

    await Todo.findByIdAndUpdate(req.params.id, updatedTask, { new: true });
}

const markDone = async (req, res) => {
    // router.route("/mark/:id").put(markDone);
    var updatedTask = {
        complete: true
    }

    await Todo.findByIdAndUpdate(req.params.id, updatedTask, { new: true });
}

const deleteById = async (req, res) => {
    // router.route("/:id").delete(deleteById);
    var deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleted);
}

module.exports = { getAll, getById, add, updateById, deleteById, markDone }