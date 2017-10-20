'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),

      app        = express(),
      mongoDB    = 'mongodb://localhost/project-web-avance',
      db         = mongoose.connection,

      usersCtrl = require('./controllers/usersCtrl'),
      pizzasCtrl = require('./controllers/pizzasCtrl');

mongoose.connect(mongoDB, { useMongoClient: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/users', usersCtrl);
app.use('/pizzas', pizzasCtrl);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});