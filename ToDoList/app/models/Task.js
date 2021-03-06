const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // user name
    // title for todo
    // field to track whether task is complete or not
    // created at
    // updated at
    // category(work, hobby, task)

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    complete: { type: Boolean, required: true, default: false },
    category: { type: String, required: true },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    },
    tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;