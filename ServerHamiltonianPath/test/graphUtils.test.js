// graphUtils tests
var assert = require('assert');
var GraphUtils = require('../lib/graphUtils.js');

describe('graphUtils.test.js', function() {

    describe('Validate Graph Object', function() {

        var validate = GraphUtils.isValidGraph;

        it('Missing parameter is invalid', function() {
            // assert.strictEqual(GraphUtils.isValidGraph(), false);
            assert.strictEqual(validate(), false);
        })

        it('Empty object is invalid', function() {
            // assert.strictEqual(GraphUtils.isValidGraph({}), false);
            assert.strictEqual(validate({}), false);
        });

        it('Valid graph with single edges', function() {
            var graph = { 
                'A': 'B', 
                'B': 'C',
                'C': 'A'
            };
            assert.strictEqual(validate(graph), true);
        });

        it('Valid graph with multiple edges', function() {
            var graph = { 
                'A': 'B', 
                'B': ['A','C'],
                'C': 'A'
            };
            assert.strictEqual(validate(graph), true);
        });

        it('Invalid graph with single edges', function() {
            var graph = { 
                'A': 'B', 
                'B': 'C'
            };
            assert.strictEqual(validate(graph), false);
        });

        it('Invalid graph with multiple edges', function() {
            var graph = { 
                'A': 'B', 
                'B': ['A','C']
            };
            assert.strictEqual(validate(graph), false);
        });
    });

    // 

    describe('Verify Hamiltonian Path', function() {
        it('Graph should have multiple 3 Hamiltonian paths', function() {
            var graph = {
                'A': 'B',
                'B': ['C', 'A'],
                'C': 'A'
            };
            
            var paths = [];

            GraphUtils.getHamiltonianPath(graph, function (path) {
                if (path) {
                    paths.push(path);
                }
            });
            assert.equal(paths.length, 3);
        });

        // this test fails :(
        it('Graph wihout a Hamlitonian path should not return nothing for not being circular', function() {
            var graph = {
                'A': 'B',
                'B': ['C', 'A'],
                'C': 'B'
            };
            
            var paths = [];

            GraphUtils.getHamiltonianPath(graph, function (path) {
                if (path) {
                    paths.push(path);
                }
            });
            // debug(paths);
            assert.equal(paths.length, 0);
        });
    });
});