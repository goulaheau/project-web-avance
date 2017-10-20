'use strict';

const express = require('express'),
      jwt     = require('jsonwebtoken'),
      config  = require('../config'),
      router  = express.Router(),

      User    = require('../models/user');

router.post('/register', (req, res) => {
    const user = new User(req.body);

    user.validate(err => {
        if (err) {
            return res.status(422).send(err);
        }

        user.save((err, user) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send(user);
        });
    });
});

router.post('/auth', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        } else if (user === null) {
            return res.status(401);
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!isMatch) {
                    res.status(401);
                } else {
                    jwt.sign({
                        username: user.username,
                        password: user.password
                    }, config.auth.secret, {expiresIn: '2 days'}, (err, token) => {
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