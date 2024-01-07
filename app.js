const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.errorHandler);

module.exports = app;

// Add endpoints handlers

// POST /api/users {}
// GET /api/users
// GET /api/users/1
// PATCH /api/users/1 {}
// DELETE /api/users/1
