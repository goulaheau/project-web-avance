'use strict';

const _       = require('lodash'),
      router  = require('express').Router(),

      Pizza   = require('../models/Pizza');

router.get('/', (req, res) => {
    Pizza.find((err, pizza) => {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send(pizza);
    });
});

router.get('/:id', (req, res) => {
    Pizza.findById(req.params.id, (err, pizza) => {
        if (err) {
            return res.status(500).send(err);
        } else if (pizza === null) {
            return res.status(404);
        }

        return res.status(200).send(pizza);
    });
});

router.post('/', (req, res) => {
    const pizza = new Pizza(req.body);

    pizza.validate(err => {
        if (err) {
            return res.status(422).send(err);
        }

        pizza.save((err, pizza) => {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send(pizza);
        });
    });
});

router.put('/:id', (req, res) => {
    Pizza.findById(req.params.id, (err, pizza) => {
        if (err) {
            return res.status(500).send(err);
        } else if (pizza === null) {
            return res.status(404);
        }

        _.merge(pizza, req.body);
        pizza.validate(err => {
            if (err) {
                return res.status(422).send(err);
            }

            pizza.save((err, pizza) => {
                if (err) {
                    return res.status(500).send(err);
                }

                return res.status(200).send(pizza);
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    Pizza.findByIdAndRemove(req.params.id, (err, pizza) => {
        if (err) {
            return res.status(500).send(err);
        } else if (pizza === null) {
            return res.status(404);
        }

        return res.status(200);
    });
});

module.exports = router;