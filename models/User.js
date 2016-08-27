"use strict";

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

let setDates = function (next) {
  console.log('pre');
  // get the current date
  let currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  console.log(this.name);

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
}

userSchema.pre('save', setDates);

userSchema.methods.updateUserData = function(newUser) {
  this.name = newUser.name;
  return this;
}

const User = mongoose.model('User', userSchema);

module.exports = User;