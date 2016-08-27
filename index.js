"use strict";

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.Promise = require("bluebird");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Database connected`));


// Express config
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use('/', bodyParser.json());


// Routes
const userRouter = require('./routers/users');

app.use('/api', userRouter);

server.listen(port, () => console.log(`Rest service running on port ${port}`));