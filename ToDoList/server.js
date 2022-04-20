// Environment
require('dotenv').config({ path: './.env' });

// Imports---------------------------------------------------------------------
// - Packages
const cors = require('cors');
const express = require('express');
const colors = require('colors');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const passport = require("passport")

// - Connections
const dbConnection = require('./config/mongo');
require("./utils/JwtStrategy")
require("./utils/LocalStrategy")
require("./utils/authenticate")
// - Variables
const PORT = process.env.PORT || 3000;
// - Routes
const tasksRoute = require('./app/routes/tasks');
const usersRoute = require('./app/routes/users');

// Imports---------------------------------------------------------------------

// const whitelist = process.env.WHITELISTED_DOMAINS
//     ? process.env.WHITELISTED_DOMAINS.split(",")
//     : ["http://localhost:3001"];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }

// - Express app
const app = express();

// Connections-----------------------------------------------------------------
dbConnection();

// Middlewares-----------------------------------------------------------------
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

// Routes----------------------------------------------------------------------
// Endpoints
app.use('/task', tasksRoute);
app.use('/user', usersRoute);

// Listener--------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});