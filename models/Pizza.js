'use strict';

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const pizzaSchema = new Schema({
    name: {
        type    : String,
        required: true
    }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;