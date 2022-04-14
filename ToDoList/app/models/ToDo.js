const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    // user name
    // title for todo
    // field to track whether task is complete or not
    // created at
    // updated at
    // category(work, hobby, task)

    user_name: { type: String, required: true },
    title: { type: String, required: true },
    complete: { type: Boolean, required: true, default: false },
    category: { type: String, required: true },

}, { timestamps: true });

const ToDo = mongoose.model("ToDo", todoSchema);
module.exports = ToDo;