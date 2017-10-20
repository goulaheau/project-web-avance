'use strict';

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,

      pizzaSchema = new Schema({
          name: String
      }),

      Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;