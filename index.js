const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const port = 3000;

const userRouter = require('./routers/users');

app.use('/api', userRouter);

server.listen(3000, () => console.log(`Rest service running on port ${port}`));