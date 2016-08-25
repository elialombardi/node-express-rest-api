const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const port = 3000

app.get('/api/users', function(req, res) {
    res.json([
        { name: 'Pablo', lastname: 'Escobar', age: 45},
        { name: 'Laura', lastname: 'Ciccinni', age: 35},
        { name: 'Luca', lastname: 'Daino', age: 15}
    ]);
});

server.listen(3000, () => console.log(`Rest service running on port ${port}`));