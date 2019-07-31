// var debug = require('debug-log2');
var debug = require('debug')('graphUtils');

// debug.enable();

module.exports = class GraphUtils {

    /**
     * Verifies if the graph object is valid per the input format:
     * 
     * @static
     * @param obj - object - JSON object representing a directional graph
     * @return boolean - True if obj is valid
     */
    static isValidGraph(obj) {

        if (obj == undefined || obj == null || typeof obj != 'object' ) {
            return false;
        }

        var keys = Object.keys(obj);

        if (keys.length == 0) {
            return false;
        }

        // verify the values of each key is a key
        var vertices = {};
        for (var i=0; i<keys.length; i++) {
            var key = keys[i];
            for (var n=0; n<obj[key].length; n++) {
                var vertex = obj[key][n];
                if (!obj.hasOwnProperty(vertex)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Gets all of the Hamiltonian Paths' for the object
     * 
     * @static 
     * @param obj - object - The internal JSON representation of a directional graph
     * @param callback - function - The callback function
     */
    static getHamiltonianPath(obj, callback) {


        // begin performing the analysis
        function doIt(obj) {
            debug('Attempting to get Hamilton paths for graph:', obj);

            var verticies = Object.keys(obj);
 
            for (var i=0; i<verticies.length; i++) {
                var visited = {};
                visited[verticies[i]] = 1;

                var path = [ verticies[i] ];

                getAvailableVertecies(obj, path, visited, callback);
            }
        }

        /**
         * Recursively called function to get the sequence of verticies along a path
         * 
         * @param obj - object - A JSON object representing the directoinal graph being analyized (internal format)
         * @param path - array - The path being followed
         * @param visited - object - A hash of verticies which are in the path
         * @param callback - function - The callback function
         */
        function getAvailableVertecies(obj, path, visited, callback) {
            
            var avail = [];
            var edges = obj[path[path.length-1]];
            
            for (let vertex in edges) {
                // are we done yet?
                if (path.length == Object.keys(obj).length) {
                    // make one final check, for circular path
                    if (obj[path[path.length - 1]].hasOwnProperty(path[0])) {
                        path.push(path[0]);
                        
                        if (typeof callback == 'function') {
                            callback(path);
                        }
                        return;
                    }
                }

                // confirm the vertex hasn't been visited already
                debug('visited: ', visited);
                debug('path:', path);
                if (visited.hasOwnProperty(vertex) === false) {
                    visited[vertex] = 1;
                    path.push(vertex);

                    getAvailableVertecies(obj, path, visited, callback);
                } else {
                    // there's a bug in here
                    return;
                }
            }
            callback(null);
        }

        // convert the graph a a format which is easier to traverse, and begin searching
        debug('Original Graph Structure', obj);
        this.restructureGraph(obj, doIt);
    }

    /**
     * Converts the structure of the JSON representation of a directional graph from the input
     * format, to the internal format to be used for analysis
     * 
     * @param obj - object - JSON object representing a directional graph, (user input format)
     * @param callback - function - The callback function
     */
    static restructureGraph(obj, callback) {
        for (var vertex in obj) {
            var edges = {};
            
            var verticies = (Array.isArray(obj[vertex])) ? obj[vertex] : [obj[vertex]];

            for (var i=0; i<obj[vertex].length; i++) {
                edges[obj[vertex][i]] = 1;
            }
            obj[vertex] = edges;
        }
        debug('restructured graph:', obj);
        callback(obj);
    }

}