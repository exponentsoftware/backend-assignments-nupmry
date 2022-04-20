const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require("passport-local-mongoose")

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new mongoose.Schema({
    // User name
    // email
    // phone
    // created at
    // updated at
    // role

    // username: { type: String, required: true },
    username: {
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
    password: { type: String, required: true },
    refreshToken: {
        type: [Session],
    },
    // role: { type: String, required: true, default: 'user' },

}, { timestamps: true });

userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

userSchema.plugin(passportLocalMongoose)

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;