'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      config     = require('./config'),
      app        = express(),
      port       = process.env.PORT || 3000,

      usersCtrl  = require('./controllers/usersCtrl'),
      pizzasCtrl = require('./controllers/pizzasCtrl');

mongoose.connect(config.database.local, {useMongoClient: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/pizzas', pizzasCtrl);
app.use('/users', usersCtrl);

app.listen(port, () => {
    console.log(`project-web-avance listening on port ${port}`);
});