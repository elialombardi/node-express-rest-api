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

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected`);
});


const port = 3000;

const userRouter = require('./routers/users');

app.use('/api', userRouter);

server.listen(3000, () => console.log(`Rest service running on port ${port}`));