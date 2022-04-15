// Environment
require('dotenv').config({ path: './.env' });

// Imports---------------------------------------------------------------------
// - Packages
const cors = require('cors');
const express = require('express');
const colors = require('colors');
// - Connections
const dbConnection = require('./config/mongo');
// - Variables
const PORT = process.env.PORT || 3000;
// - Routes
const tasksRoute = require('./app/routes/tasks');
const usersRoute = require('./app/routes/users');

// Imports---------------------------------------------------------------------

// - Express app
const app = express();

// Connections-----------------------------------------------------------------
dbConnection();

// Middlewares-----------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Routes----------------------------------------------------------------------
// Endpoints
app.use('/tasks', tasksRoute);
app.use('/users', usersRoute);

// Listener--------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow.bold);
});
