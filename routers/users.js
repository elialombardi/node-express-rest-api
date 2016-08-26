"use strict";
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.route('/users')
    .get(function(req, res) {
        User.find({}).then((users) => {
            res.json(users);
        }, (err) => {
            console.err(err);
        });
    })
    .post(function(req, res) {
        // let user = new User({
        //     name: 'Maria'
        // });
        
        // user.save().then(
        //     user => res.json(user), 
        //     err => res.json(err)
        // );        
    })
    .delete((req, res) => {
        User.remove({}).then((succ) => {
            console.log(`removed all users`);
            res.json(succ);
        }, (err) => {
            console.log(err.message);
            res.json('Failed');
        });
    });

router.route('/users/:id')
    .get((req, res) => {
        User.findOne({_id: req.params.id}).then((user) => { res.json(user)}, (err) => res.json(err))
    })
    .put()
    .delete((req, res) => {
        User.remove({_id: req.params.id}).then((users, arg1, arg2, arg3) => {
            console.log(`removed ${req.params.id}`);
            res.json('Success');
        }, (err) => {
            console.log(err.message);
            res.json('Failed');
        })
    });

module.exports = router;