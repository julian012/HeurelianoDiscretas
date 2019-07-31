var assert = require('assert');
var request = require('request');

var graphUtils = require('../lib/graphUtils.js');

// var httpOptions = {
//             'url': 'http://127.0.0.1:3000',
//             'json': true,
//             'method': 'put'
// };

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('HTTP Server', function() {
    it('server should be running on port 3000', function(done) {
        var httpOptions = {
            'url': 'http://127.0.0.1:3000',
            'json': true,
            'method': 'put'
        };
        
        request(httpOptions, function(err, res, body) {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('graph routes', function() {
        var httpOptions = {
            uri: 'http://127.0.0.1:3000/graph',
            // json: true,
            method: 'post',
            body: JSON.stringify({
                'A': 'B',
                'B': ['C', 'A'],
                'C': 'A'
            }),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }

        request(httpOptions, function(err, res, body) {
            assert.equal(body, 'Done-graphx');
            done();
        });

    });
});
