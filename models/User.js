"use strict";

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

    console.log('pre');

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;