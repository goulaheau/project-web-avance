'use strict';

const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt'),
      Schema   = mongoose.Schema,

      userSchema = new Schema({
          username: {
              type: String,
              lowercase: true,
              unique: true,
              required: true
          },
          password: {
              type: String,
              required: true
          }
      });

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                next(err);
            } else {
                bcrypt.hash(this.password, salt, (err, hash) => {
                    if (err) {
                        next(err);
                    } else {
                        this.password = hash;
                        next();
                    }
                });
            }
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;