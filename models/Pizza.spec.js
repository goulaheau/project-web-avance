'use strict';

const {expect} = require('chai'),
      Pizza    = require('./Pizza');

describe('Pizza Model', () => {
    it('should be invalid if name is empty', done => {
        const pizza = new Pizza();

        pizza.validate(err => {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});