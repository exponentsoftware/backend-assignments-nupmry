require('dotenv').config({ path: '../.env ' });
const connectionString = process.env.MONGO_URI;
const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        mongoose.connect(connectionString, connectionParams);
        console.log("Connected to database successfully..".cyan.underline);
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!".red.bold);
    }
}