'use strict';

const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt'),
      Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type    : String,
        unique  : true,
        required: true
    },
    password: {
        type    : String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }

                this.password = hash;

                return next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }

        return cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;