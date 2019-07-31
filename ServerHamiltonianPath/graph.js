var express = require('express');
var router = express.Router();

var GraphUtils = require('./lib/graphUtils.js');

router.put('/', function(req, res){
    console.log('request recieved (graph):', req.body);

    if (GraphUtils.isValidGraph(req.body) === false) {
        res.status(400);
        res.send('Invalid Graph');
    }

    var paths = [];
    GraphUtils.getHamiltonianPath(req.body, function(path) {
        paths.push(path);
        res.status(200);
        res.send(paths[0]);
    });
    // res.send(JSON.stringify( { data: 'Done-graph' } );
    res.send( {data: 'Done-graphsx' });
});

module.exports = router;