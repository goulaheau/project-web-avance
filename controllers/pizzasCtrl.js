'use strict';

const express = require('express'),
      router  = express.Router(),

      Pizza   = require('../models/pizza');

router
    .get('/', (req, res) => {
        Pizza.find((err, pizza) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(pizza);
            }
        });
    })
    .get('/:id', (req, res) => {
        Pizza.findById(req.params.id, (err, pizza) => {
            if (err) {
                res.status(500).send(err)
            } else if (pizza === null) {
                res.status(404).send('No pizza found with that ID')
            } else {
                res.status(200).send(pizza)
            }
        });
    })
    .post('/', (req, res) => {
        const pizza = new Pizza(req.body);
        pizza.save((err, pizza) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(pizza);
        });
    })
    .put('/:id', (req, res) => {
        Pizza.findById(req.params.id, (err, pizza) => {
            if (err) {
                res.status(500).send(err);
            } else if (pizza === null) {
                res.status(404).send('No pizza found with that ID');
            } else {
                pizza.name = req.body.name || pizza.name;
                pizza.save((err, pizza) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.status(200).send(pizza);
                });
            }
        });
    })
    .delete('/:id', (req, res) => {
        Pizza.findByIdAndRemove(req.params.id, (err, pizza) => {
            if (err) {
                res.status(500).send(err);
            } else if (pizza === null) {
                res.status(404).send('No pizza found with that ID');
            } else {
                let response = {
                    message: 'Pizza successfully deleted',
                    pizza: pizza
                };
                res.status(200).send(response);
            }
        });
    });

module.exports = router;