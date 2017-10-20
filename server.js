'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      config     = require('./config'),
      app        = express(),

      pizzas     = require('./controllers/pizzas'),
      users      = require('./controllers/users');

mongoose.connect(config.database.local, {useMongoClient: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pizzas', pizzas);
app.use('/users', users);

app.listen(config.port, () => {
    console.log(`project-web-avance listening on port ${config.port}`);
});