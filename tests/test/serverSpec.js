const assert = require('chai').assert;
const mocha = require('mocha');
const app = require('../../server/index.js');

//tests are working
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

//shows that it is able to get within the server index file
describe('It should return an object', function() {
  describe('returns object', function() {
    it('should return an object when doing a call to the runMe function in index.js', function() {
      assert.typeOf(app.runMe(), 'object');
    });
  });
});

//tests that checks that the incoming req from the client is a json object that includes a userID

//tests that checks that the incoming req from the analytics is a json object that has a userID, useratio, usertop categories

//tests that checks the advertisements component queries

//tests to check database writes

//tests to check logstash/elasticsearch/kibana functionality



