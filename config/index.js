'use strict';

const port = process.env.PORT || 3000;

const config = {
    auth: {
        secret: 'BobbySecret'
    },
    database: {
        local: 'mongodb://localhost/project-web-avance'
    },
    port : port,
    url: {
        local: `http://localhost:${port}`,
    }
};

module.exports = config;