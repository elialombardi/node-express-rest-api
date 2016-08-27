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
        console.log(req.body);
        let user = new User(req.body);
        
        user.save().then(
            user => res.json(user), 
            err => res.json(err)
        );        
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
    .put((req, res) => {

        // Prevent updating other resources
        req.body._id = req.params.id;
        console.log(`Updating ${req.body.name} - ${req.body._id}`);

        User.findOne({ _id: req.body._id }).then(
            oldUser => {
                oldUser.updateUserData(req.body);
                oldUser.save().then(
                    (user) => res.json(user), 
                    (err) => {
                        console.log(err);
                        res.json('Failed');
                    }
                )
            }, 
            err => {
                console.log(err);
                res.json('Failed');
            }
        );
        
        // User.update(conditions, update, options, callback);
        // Update method doesn't have middleware'
        // User.update({_id: req.body._id}, req.body).then(
        //     (user) => res.json(user),
        //     (err) => res.json(err)
        // );
    })
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