const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // User name
    // email
    // phone
    // created at
    // updated at
    // role

    user_name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Please enter a valid number"
        }
    },
    role: { type: String, required: true, default: 'user' },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;