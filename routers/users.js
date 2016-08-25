const express = require('express');
const router = express.Router();

router.route('/users')
    .get(function(req, res) {
        res.json([
            { name: 'Pablo', lastname: 'Escobar', age: 45},
            { name: 'Laura', lastname: 'Ciccinni', age: 35},
            { name: 'Luca', lastname: 'Daino', age: 15}
        ]);
    })
    .post();

router.route('/users/:id')
    .get()
    .put()
    .delete();

module.exports = router;