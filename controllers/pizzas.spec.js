'use strict';

const chai     = require('chai'),
      chaiHttp = require('chai-http'),
      {expect} = chai,
      config   = require('../config'),

      route    = '/pizzas';

chai.use(chaiHttp);

describe('Pizzas Controller', () => {
    context('GET /', () => {
        it('should have status code equals to 200', done => {
            chai.request(config.url.local).get(route).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
        });
        it('should be an array', done => {
            chai.request(config.url.local).get(route).end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
    // TODO: Faire le POST
    context('POST /', () => {
        it('should have status code equals to 200', done => {
            chai.request(config.url.local).get(route).end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
        });
        it('should be an array', done => {
            chai.request(config.url.local).get(route).end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
});