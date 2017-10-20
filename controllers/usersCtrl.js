'use strict';

const express = require('express'),
      jwt     = require('jsonwebtoken'),
      config  = require('../config'),
      router  = express.Router(),

      User = require('../models/user');

router
    .post('/register', (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.status(422).send('Please enter username and password.');
        } else {
            const user = new User(req.body);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(user);
            });
        }
    })
    .post('/auth', (req, res) => {
        User.findOne({username: req.body.username}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (user === null) {
                res.status(404).send('No user found with that email');
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        res.status(500).send(err);
                    } else if (!isMatch) {
                        res.status(401).send('Authentication failed. Passwords did not match.');
                    } else {
                        jwt.sign({ username: user.username, password: user.password }, config.auth.secret, { expiresIn: '2 days' }, (err, token) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).send(token);
                            }
                        });
                    }
                });
            }
        });
    });

module.exports = router;