'use strict';


define('graph', ['d3'], function (d3) {

    let graph = {};
    graph.init = function() {
        var dataset = [ 5, 10, 15, 20, 25 ];
        d3.select("#graphzone")  // 1
        .selectAll("p")          // 2
        .data(dataset)           // 3
        .enter()                 // 4
        .append("p")             // 5
        .text("New paragraph!"); // 6
    }

    return graph;
});