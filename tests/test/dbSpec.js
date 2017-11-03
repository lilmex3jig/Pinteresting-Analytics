const assert = require('chai').assert;
const mocha = require('mocha');
const db = require('../../databasae-mysql/index.js');

describe('It should return an object', function() {
    describe('returns object', function() {
      it('should return an object when doing a call to the runMe function in index.js', function() {
        assert.typeOf(app.runMe(), 'object');
      });
    });
  });