const assert = require('chai').assert;
const mocha = require('mocha');
const app = require('../../server/index.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('It should return an object', function() {
  describe('returns object', function() {
    it('should return an object when doing a call to the runMe function in index.js', function() {
      assert.typeOf(app.runMe(), 'object');
    });
  });
});

