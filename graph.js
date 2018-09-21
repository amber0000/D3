'use strict';


define('graph', ['d3'], function (d3) {

    let graph = {};
    graph.init = function() {
        // graph.t01(); // tutorial 
        // graph.t02(); // append, style, text
        // graph.t03(); // svg - svg.append('circle','rect','line')
        // graph.t04(); // visual Data - enter(), attr("y", function(d,i) { return i * 100 })
        // graph.t05(); // scale - sclaeLinear() , domain([]) , range(["red","blue"])
        // graph.t06(); // group and svg.transform, axis 
        // graph.t07(); // Enter, Update, Exit
        // graph.t08(); // transition, circle.transition(), on('end')
        // graph.t09(); // Array
        // graph.t10(); // Loading external Data - await d3.json()
        // graph.t11(); // path - 잘모르겠음
        // graph.t12(); // arch - 기본적인 예 .innerRadius .outerRadius .startAngle .endAngle
        // graph.t13(); // Pie Layout - let pie = d3.pie().value(function (d) { return d;}); , let arc = d3.arc().innerRadius(r-30).outerRadius(r);
        // graph.t14(); // Tree Layout1
        // graph.t15(); // Tree Layout2 - let nodes = d3.hierarchy(data) 하이얼럴키, data(nodes.descendants()) , d3.tree(rootNode)
        // graph.t16(); // Cluster, Pack & Bubble layouts - pack = d3.pack().size([w,h -50]), nodes = d3.hierarchy(data), nodes = pack(nodes), data(nodes.descendants())
        // graph.t17(); // Histogram Layout
        // graph.t18(); 
        // graph.t18_01(); treemap
        // graph.t19(); // treemap
         graph.t20(); // geo zoom 
    }

    graph.t01 = function() {
        var dataset = [ 5, 10, 15, 20, 25 ];
        d3.select("#graphzone")  // 1
        .selectAll("p")          // 2
        .data(dataset)           // 3
        .enter()                 // 4
        .append("p")             // 5
        .text("New paragraph!"); // 6
    }

    graph.t02 = function() {
        d3.select("#graphzone")
        .append("p")
        .style("color", "Red")
        .text("hi there")
    }

    // svg - svg.append("circle"), circle, rect, line , attr("stroke-width", 100);
    graph.t03 = function() {
        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("width",500)
                    .attr("height",500);
        
        let circle = canvas.append("circle")
                    .attr("cx", 250)
                    .attr("cy", 250)
                    .attr("r" ,50)
                    .attr("fill", "blue");

        let rect = canvas.append("rect")
                    .attr("width" ,100)
                    .attr("height", 50)
                    .attr("fill", "yellow");
        
        let line = canvas.append("line")
                    .attr("x1", 0)
                    .attr("x2", 100)
                    .attr("x2", 400)
                    .attr("y2", 400)
                    .attr("stroke", "green")
                    .attr("stroke-width", 10);
    }

    // visual Data - enter(), attr("y", function(d,i) { return i * 100 })
    graph.t04 = function() {
        let dataArray = [20,40,50];
        
        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 500);
        
        let bars = canvas.selectAll("rect")
                    .data(dataArray)
                    .enter()
                    .append("rect")
                    .attr("width", function(d, i){ return d * 10; })
                    .attr("height", 50)
                    .attr("y", function(d,i){ return i * 100; })
                    .attr("fill", "blue")
    }

    // scale - sclaeLinear() , domain([]) , range(["red","blue"])
    // https://www.bsidesoft.com/?p=2382
    graph.t05 = function() {
        let dataArray = [10,20,30,50];
        let width = 500;
        let height = 500;

        // v3 까지 지원
        // > let widthScale = d3.scale.Linear()
        // v4
        let widthScale = d3.scaleLinear()
                        .domain([0,60])
                        .range([0,width]);

        let colorScale = d3.scaleLinear()
                        .domain([0,60])
                        .range(["red","blue"])

        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 500);
        
        let bars = canvas.selectAll("rect")
                    .data(dataArray)
                    .enter()
                    .append("rect")
                    .attr("width", function(d,i){ return widthScale(d) })
                    .attr("height", 50)
                    .attr("y", function(d,i){ return i * 100; })
                    .attr("fill", function(d,i){ return colorScale(d) })
    }

    // group and svg.transform axis 
    // - append("g") - svg 그룹핑
    //
    // - svg att("transform","translate(50,50")
    // - transform functions = https://developer.mozilla.org/ko/docs/Web/SVG/Attribute/transform
    // - translate(x,y) : 이동, 
    // - scale(x, [y]) : x, y 방향으로 신축비율
    // - rotate(a) : 회전
    //
    // - axis
    // - https://github.com/zziuni/d3/wiki/SVG-Axes#axis
    // - let axis = d3.axisBottom([])
    // - canvas.call(axis)
    graph.t06 = function() {
        let dataArray = [10,20,30,50];
        let width = 500;
        let height = 500;

        // v3 까지 지원
        // > let widthScale = d3.scale.Linear()
        // v4
        let widthScale = d3.scaleLinear()
                        .domain([0,60])
                        .range([0,width]);

        let colorScale = d3.scaleLinear()
                        .domain([0,60])
                        .range(["red","blue"])

        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 500)
                    .append("g") // 그룹핑
                    .attr("transform","translate(50,50)")

        let bars = canvas.selectAll("rect")
                    .data(dataArray)
                    .enter()
                    .append("rect")
                    .attr("width", function(d,i){ return widthScale(d) })
                    .attr("height", 50)
                    .attr("y", function(d,i){ return i * 100; })
                    .attr("fill", function(d,i){ return colorScale(d) })
        
        // v3 까지 지원
        // > let axis = d3.svg.axis()
        let axis = d3.axisBottom(widthScale).ticks(40)
        canvas.append("g")
            .attr("transform", "translate(0,400)")
            .call(axis);
    }

    // Enter, Update, Exit
    // Dom element < Data elements (enter)
    // Dom element > Data elements (exit)
    // Dom element = Data elements (update)
    graph.t07 = function() {
        let dataArr = [10,20,30];
        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 500)
        
        let circle1 = canvas.append("circle")
                    .attr("cx", 25)
                    .attr("cy", 50)
                    .attr("r", 25);

        let circle2 = canvas.append("circle")
                    .attr("cx", 25)
                    .attr("cy", 150)
                    .attr("r", 25)

        let circles = canvas.selectAll("circle")
                    .data(dataArr)
                    .attr("fill","red")
                    // .exit()
                    // .attr("fill","green")
                    .enter()
                        .append("circle")
                        .attr("cx", function(d,i) { return (i+1) * 50 })
                        .attr("cy", 50)
                        .attr("r", 25)
                        .attr("fill","blue");
    }

    // transition
    graph.t08 = function() {
        let canvas = d3.select("#graphzone")
                    .append("svg")
                    .attr("with", 500)
                    .attr("height", 500)
        
        let circle = canvas.append("circle")
                    .attr("cx", 50)
                    .attr("cy", 50)
                    .attr("r", 25);
        
        circle.transition()
        .duration(1500)
        //.delay(1000)
        .attr("cx", 150)
        .transition()
        .attr("cy", 200)
        .on("end",function(){
            d3.select(this).attr("fill","red");
        })

        // v3
        //.each("end", function(){ d3.select(this).attr("fill","red") })
    }

    // Working With Arrays
    // "arr : 10,20,30,40,50"
    // "arr.sort(d3.ascending) : 10,20,30,40,50"
    // "d3.min(arr) : 10"
    // "d3.max(arr) : 50"
    // "d3.extent(arr) : 10,50"
    // "d3.sum(arr)    :   150"
    // "d3.mean(arr)   :   30"
    // "d3.median(arr) :   30"
    // "d3.shuffle(arr)    :   10,40,20,30,50"
    // "d3.shuffle(arr)    :   10,20,30,40,50"    
    graph.t09 = function() {
        let arr = [10,20,30,40,50];
        let sArr =[
            "arr : "                    + arr,
            "arr.sort(d3.ascending) : " + arr.sort(d3.ascending),
            "d3.min(arr) : "            + d3.min(arr),
            "d3.max(arr) : "            + d3.max(arr),
            "d3.extent(arr) : "         + d3.extent(arr),
            "d3.sum(arr)    :   "       + d3.sum(arr),
            "d3.mean(arr)   :   "       + d3.mean(arr),
            "d3.median(arr) :   "       + d3.median(arr),
            "d3.shuffle(arr)    :   "   + d3.shuffle(arr),
            "d3.shuffle(arr)    :   "   + d3.shuffle(arr),
        ]
        console.dir(sArr);
    }

    // Loading external Data - await d3.json()
    // v5 change async await - https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50
    graph.t10 = async function() {
        
        var data = await d3.json("mydata.json")
        let canvas = d3.select("#graphzone")
                        .append("svg")
                        .attr("width", 500)
                        .attr("height", 500);
                
            canvas.selectAll("rect")
                    .data(data)
                    .enter()
                        .append("rect")
                        .attr("width", function(d) { return d.age * 10 })
                        .attr("height", 50)
                        .attr("y", function(d,i) { return (i) * 50 })
                        .attr("fill", "blue");

            canvas.selectAll("text")
                    .data(data)
                    .enter()
                        .append("text")
                        .attr("fill", "white")
                        .attr("y", function(d,i) {return i * 50 +24})
                        .text(function(d) {return d.name});

    }

    // Path
    // path 잘 모르겟음
    // path ex - https://stackoverflow.com/questions/40687719/highlight-elliptical-arc-drawn-using-d3-js-on-mouseover-and-display-tooltip
    graph.t11 = function() {
        let data = [
            {x:10, y:30},
            {x:20, y:20},
            {x:20, y:20},
            {x:90, y:60},
            {x:10, y:60},
        ];

        // 하트 - https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
        let data2 = [
         {d:"M 10,30"},
         {d:"A 20,20 0,0,1 50,30"},
         {d:"A 20,20 0,0,1 90,30"},
         {d:"Q 90,60 50,90"},
         {d:"Q 10,60 10,30 z"}
        ]

        let canvas = d3.select("#graphzone")
                        .append("svg")
                        .attr("width", 500)
                        .attr("height", 500);

        let group = canvas.append("g")
            .attr("transform", "translate(100,100)");
        
        // https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape
        // v4 부터 shape가 다 변경됨
        // > let line = d3.svg.line()
        let line = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });

        group.selectAll("path")
            .data([data])
            .enter()
            .append("path")
            .attr("d" , line)
            .attr("fill", "red")
            .attr("stroke", "#000")
            //.attr("stroke-width", 10);
        
    }

    // arcs
    // 원형 그래프 예 - https://steemit.com/kr-dev/@codingman/steem-js-d3-js
    graph.t12 = function() {

        let canvas = d3.select("#graphzone")
                        .append("svg")
                        .attr("width", 500)
                        .attr("height", 500);

        let group = canvas.append("g")
            .attr("transform", "translate(100,100)");

        let r = 100;
        let p = Math.PI * 2;
        
        let arc = d3.arc()
                .innerRadius(r -20)
                .outerRadius(r)
                .startAngle(0)
                .endAngle(p -1);
        
        group.append("path")
            .attr("d", arc);

    }

    // Pie Layout
    // scaleOrdinal(수치적x) vs scaleLinear(수치적) - http://mm4mm.tistory.com/7
    // 한글 api ( pie ) - https://code-examples.net/ko-kr/docs/d3~4/d3-shape#pies
    // 값계산후 대입 따로 - d3.pie() , 디자인 따로 - d3.arc()
    //
    // pie 함수 - https://github.com/d3/d3-shape/blob/master/src/pie.js
    // let pie = d3.pie().value(function (d) { return d;});    
    // let arc = d3.arc().innerRadius(r-30).outerRadius(r);
    // {data: 10, index: 2, value: 10, startAngle: 5.834386356666759, endAngle: 6.283185307179586, …}
    // {data: 50, index: 1, value: 50, startAngle: 3.5903916041026207, endAngle: 5.834386356666759, …}
    // {data: 80, index: 0, value: 80, startAngle: 0, endAngle: 3.5903916041026207, …}
    //
    // ★arcs.append("path")
    graph.t13 = function() {

        let data =[10,50,80];
        let r = 100;

        let color = d3.scaleOrdinal()
        .range(["red","blue","orange"]);

        let canvas = d3.select("#graphzone")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

        let group = canvas.append("g")
        .attr("transform", "translate(200,200)");

        let arc = d3.arc()
        .innerRadius(r-30)
        .outerRadius(r);

        let pie = d3.pie()
        .value(function (d) { return d;});

        console.log(pie(data))
        let arcs = group.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")

        arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d) {return color(d.data) });
    }

    // Tree Layout 1
    // v3 - d3.svg.diagonal
    // D3 version 4.9.0 introduced "link" shapes
    // which have the same functionality of the old d3.svg.diagonal in D3 v3.
    // v4 - link
    // d3.linkHorizontal()
    // d3.linkVertical()
    // d3.linkRadial()
    // v4 link ex - https://stackoverflow.com/questions/40845121/where-is-d3-svg-diagonal
    graph.t14 = function() {

        var data = {
            source: {
              x: 20,
              y: 10
            },
            target: {
              x: 280,
              y: 100
            }
          };

        let canvas = d3.select("#graphzone")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

        let link = d3.linkVertical()
        .x(function(d) {return d.y;} )
        .y(function(d) {return d.x;} )
        
        canvas.append("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("d", link(data))
    }

    // Tree Layout 2
    // 예제 - https://bl.ocks.org/d3noob/5537fe63086c4f100114f87f124850dd
    // 
    // let nodes = d3.hierarchy(data) 하이얼럴키
    // > 평면 데이터 모델을 자신의 키와 부모의 키를 바탕으로 tree 구조의 데이터로 전환해준다.

    // nodes.descendants(), data(nodes.descendants().slice(1))
    // > 이 노드로부터 시작되어, 각 아이가 차례로 차례로 뒤 따르는, 자손 노드의 배열을 돌려줍니다.

    // d3.tree(rootNode).size([w,h])
    // > 트리 ( 루트 ) Source
    // 지정된 루트 Hierarchy 를 배치하여 루트 및 해당 하위 항목에 다음 등록 정보를 할당합니다.
    // node - x - 노드 의 x 좌표
    // node. y - 노드 의 y 좌표
    graph.t15 = async function() {

        // Set the dimensions and margins of the diagram
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
            w = 660 - margin.left - margin.right,
            h = 500 - margin.top - margin.bottom;

        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  w + margin.left + margin.right)
            .attr("height",  h + margin.top + margin.bottom);

        // appends a 'group' element to 'canvas'
        // moves the 'group' element to the top left margin
        var g = canvas.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        let data = await d3.json("t15.json");

        // Assigns parent
        var nodes = d3.hierarchy(data);
        console.log(nodes);
        console.log(nodes.descendants());

        // Assigns the x and y position for the nodes
        let tree = d3.tree().size([w,h]);        
        nodes = tree(nodes);

        //adds each node as a group
        var node = g.selectAll('.node')
        .data(nodes.descendants())
        .enter()
        .append('g')
            .attr('class', (d) => {
            return "node" +
                (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")" );

        // // adds the circle to the node
        node.append('circle')
        .attr('r', 10)
        .attr('fill', 'steelblue');

        // // adds the text to the node
        node.append("text")
        .attr("dy", 3)
        .attr("y", (d) => d.children ? -20 : 20 )
        .style("text-anchor", (d) =>  d.children ? "end" : "start" )
        .text((d) => d.data.name );


        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", (d) => {
                return "M" + d.x + "," + d.y
                + "C" + d.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
            })
            // 가로버전
            // .attr("d", (d) => {
            //     return "M" + d.y + "," + d.x
            //     + "C" + d.y + "," + (d.x + d.parent.y) / 2
            //     + " " + d.parent.y + "," +  (d.x + d.parent.x) / 2
            //     + " " + d.parent.y + "," + d.parent.x;
            // })
            .attr('fill', 'none')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2);
    }

    // Cluster, Pack & Bubble layouts
    // 트리&클러스터 예 - http://bl.ocks.org/anotherjavadude/2964485
    // 트리와 클러스터는 depth 의 레이아웃 차이일뿐이다.
    // pack() - https://code-examples.net/ko-kr/docs/d3~4/d3-hierarchy#pack
    // 예제 - https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f
    // pack = d3.pack().size([w,h -50])
    // nodes = d3.hierarchy(data)
    // nodes = pack(nodes)
    // data(nodes.descendants())
    graph.t16 = async function() {
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
        w = 660 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom;

        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  w + margin.left + margin.right)
            .attr("height",  h + margin.top + margin.bottom);
        
        let pack = d3.pack().size([w,h -50])
            .padding(10);
        
        let data = await d3.json("t16.json")
        
        // 하이얼럴키
        let nodes = d3.hierarchy(data)
        nodes = pack(nodes)
        console.log(nodes);

        let node = canvas.selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate (" + d.x + "," + d.y +")"
            });
        
        node.append("circle")
        .attr("r", function(d) {return d.r})
        .attr("fill", function(d) { return d.children ? "#fff" : "steelblue"})
        .attr("opacity", 0.25)
        .attr("stroke", "#ADADAD")
        .attr("stroke-width", "2");
        
        node.append("text")
        .text(function(d) {return d.data.name});
    }

    // The Histogram Layout
    // document - https://code-examples.net/ko/docs/d3~4/d3-array#histogram
    // 막대 그래프 .bins 메소드의 이름이 histogram.thresholds 로 변경되었으며 더 이상 상위 값을 허용하지 않습니다
    // > https://code-examples.net/ko-kr/docs/d3~4/d3/blob/master/changes.md
    // ex - https://bl.ocks.org/d3noob/96b74d0bd6d11427dd797892551a103c
    // https://www.youtube.com/watch?v=cu-I2um024k&list=PL6il2r9i3BqH9PmbOf5wA5E1wOG3FT22p&index=17
    // ex -https://jsfiddle.net/cyril123/5wdcjy3s/
    graph.t17 = async function() {

        var margin = {top: 40, right: 90, bottom: 50, left: 90},
        w = 660 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom,
        t = 20; // threshold

        ////////////////////////////////////////////////

        let data = await d3.json("t17.json");
        let map = data.map(function (i) { return parseInt(i.age);})
        
        let histogram = d3.histogram()
            .thresholds(t)
            (map);
        
        let x = d3.scaleLinear()
        .domain([0, d3.max(map)])
        .range([0, w]);

        let y = d3.scaleLinear()
        .domain([0, d3.max(histogram.map(function(i){ return i.length;}))])
        .range([h, 0]);        

        console.log(d3.max(map))
        //////////////////////////////////////////////

        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  w + margin.left + margin.right)
            .attr("height",  h + margin.top + margin.bottom);
        
        let group = canvas.append("g") 
            .attr("transform","translate(" + margin.left +"," + margin.top +")")
        
        let bars = group.selectAll(".bar")
            .data(histogram)
            .enter()
            .append("g")

        bars.append("rect")
            .attr("x", function(d) { return x(d.x0) })
            .attr("y",  function(d) { return  y(d.length)})
            .attr("width", function(d) { return w/t - 1 })
            .attr("height", function(d) { return  h - y(d.length) })
            .attr("fill", "steelblue");
        
        bars.append("text")
            .attr("x" , function(d) { return x((d.x0+d.x1)/2)})
            .attr("y" , function(d) { return y(d.length)})
            .attr("dy", "20px")
            .attr("dx", 0)
            .attr("fill" , "white")
            .attr("text-anchor", "middle")
            .text(function(d) { return d.length });

        let axis = d3.axisBottom(x).ticks(t)

        group.append("g")
            .attr("transform", "translate(0,410)")
            .call(axis);
    }

    // Treemap Layout
    // document - https://code-examples.net/ko-kr/docs/d3~4/d3-hierarchy#treemap
    // ex - https://bl.ocks.org/mbostock/4063582
    // ex - http://manding.tistory.com/39
    /*
        children:[]
        data:{}
        depth:0
        height:2
        parent:null
        value:100
        x0:0
        x1:480
        y0:0
        y1:410
    */
    // ★ d3.treemap 은 .sum 이 중요함
    // 데이터전체가 다 value가 있고 차일드 합이 패런트 합이랑 맞으면 그냥 써도 되지만
    // 차일드만 value 가 있으면 treemap.sum()을 활용 하면 된다.
    graph.t18 = async function () {
        
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
        w = 660 - margin.left - margin.right,
        h = 500 - margin.top - margin.bottom,
        t = 20; // threshold

        // Data
        ////////////////////////////////////////////////
        let data = await d3.json("t18.json");
        let root = d3.hierarchy(data)
            .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
            .sum(sumByCount)
            .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

        let treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([w,h])
            .round(true)
            .paddingInner(1)
            (root); // == treemap(root)
           

        console.log(root);     
        
        // Inner Func
        ///////////////////////////////////////////////
        function sumByValue(d) {
            return d.value;
          } 
        
        function sumByCount(d) {
            return d.children ? 0 : 1;
        }          
        let format = d3.format(",d");

        // v3
        // let color = d3.scale.category10();
        // https://www.youtube.com/watch?v=svT9RdyQlrw&index=19&list=PL6il2r9i3BqH9PmbOf5wA5E1wOG3FT22p
        // https://bl.ocks.org/mbostock/4063582
        // https://puppydev.com/2015-04-13/d3js-layout-tutorials-treemap-partition-and-pack/
        let color = d3.scaleOrdinal(d3.schemeCategory10);          

        // Binding
        //////////////////////////////////////////////
        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  w + margin.left + margin.right)
            .attr("height",  h + margin.top + margin.bottom);
        
        let group = canvas.append("g") 
            .attr("transform","translate(" + margin.left +"," + margin.top +")");

        let cells = group.selectAll(".cell")
            //.data(root.descendants())
            .data(root.leaves())
            .enter().append("g")
            // 텍스트 포지션 위치 잡기가 애매모호 하니까 처음부터 Cell 그룹을 trasnform 시킨다.
            .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
        
        cells.append("rect")
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return d.children ? null : color(d.parent.data.id) })

        cells.append("text")
            .selectAll("tspan")
            .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 4)
            .attr("y", function(d, i) { return 13 + i * 10; })
            .text(function(d) { return d; });            
                
    }

    graph.t18_01 = async function(){
        
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
        width = 660 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        t = 20; // threshold

        // Data
        ////////////////////////////////////////////////
        let data = await d3.json("t18.json");

        var root = d3.hierarchy(data)
            .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
            //.sum(sumByValue)
            .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

        var treemap = d3.treemap()
            .tile(d3.treemapResquarify)
            .size([width, height])
            .round(true)
            .paddingInner(1);

        console.log(root)
        treemap(root);        

        // Inner Func
        ///////////////////////////////////////////////
        var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
        color = d3.scaleOrdinal(d3.schemeCategory10),
        format = d3.format(",d");

        var timeout = d3.timeout(function() {
            d3.select("input[value=\"sumByCount\"]")
                .property("checked", true)
                .dispatch("change");
          }, 2000);
        
          function changed(sum) {
            timeout.stop();
        
            treemap(root.sum(sum));
        
            cell.transition()
                .duration(750)
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
              .select("rect")
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("height", function(d) { return d.y1 - d.y0; });
          }
      
        
        function sumByCount(d) {
          return d.children ? 0 : 1;
        }
        
        function sumBySize(d) {
          return d.size;
        }

        function sumByValue(d) {
            return d.value;
        }        

        // Binding
        //////////////////////////////////////////////
        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  width + margin.left + margin.right)
            .attr("height",  height + margin.top + margin.bottom);
        
        let group = canvas.append("g") 
            .attr("transform","translate(" + margin.left +"," + margin.top +")");
                  
        var cell = group.selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });
        
        cell.append("rect")
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { 
                return color(d.parent.data.id); 
            });
        
        cell.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.data.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.data.id; });
        
        cell.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
            .selectAll("tspan")
            .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 4)
            .attr("y", function(d, i) { return 13 + i * 10; })
            .text(function(d) { return d; });
        
        cell.append("title")
            .text(function(d) { return d.data.id + "\n" + format(d.value); });
        
        d3.selectAll("input")
            .data([sumBySize, sumByCount], function(d) { return d ? d.name : this.value; })
            .on("change", changed);
             
    }

    // Map
    // ex - (v4- kr) - http://teeeeeeemo.tistory.com/35
    // ex - (v4) - https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee
    // *ex - http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71
    // https://www.youtube.com/watch?v=dJbpo8R47D0
    // https://www.youtube.com/watch?v=lJgEx_yb4u0&list=PL6il2r9i3BqH9PmbOf5wA5E1wOG3FT22p&index=20    
    // ex - https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee
    // simple ex - http://bl.ocks.org/almccon/fe445f1d6b177fd0946800a48aa59c71
    graph.t19 = async function() {
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
        width = 660 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        t = 20; // threshold

        // Data
        ////////////////////////////////////////////////
        var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";

        let data = await d3.json(url);

        // Binding
        //////////////////////////////////////////////
        let projection = d3.geoMercator()
        .scale(width / 2 / Math.PI)
        //.scale(100)
        .translate([width / 2, height / 2])
  
        let path = d3.geoPath()
        .projection(projection);
        
        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  width + margin.left + margin.right)
            .attr("height",  height + margin.top + margin.bottom);
        
        let group = canvas.append("g") 
            .attr("transform","translate(" + margin.left +"," + margin.top +")");
    
        group.append("path")
        .attr("d", path(data))
    }

    // ex (v4) - https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee
    // svg getBBox - http://blog.xogus.io/2017/01/15/SVG%EC%97%90%EC%84%9C-getBBox-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0/
    graph.t20 = async function() {
        let margin = {top: 40, right: 90, bottom: 50, left: 90},
        w = 3000 - margin.left - margin.right,
        h = 1250 - margin.top - margin.bottom,
        t = 20; // threshold

        // Data
        ////////////////////////////////////////////////////
        let json = await d3.json("custom.geo.json");

        // Binding
        ////////////////////////////////////////////////////
        // 투사법 ( 투사법에는 여러가지가 있다 - 메르카토르, Orthographic  )
        // Equirectangular - 이퀴렉탱귤러 ( 구를 2:1 비율의 직사각형으로 펼친것 )
        // 극으로 갈수록 X 방향으로 점차 확대, Y 방향 측정은 항상 동일
        // https://www.slideshare.net/yorung/360vr

        // DEFINE VARIABLES
        // Define size of map group
        // Full world map is 2:1 ratio
        // Using 12:5 because we will crop top and bottom of map
        w = 3000;
        h = 1250;
        // variables for catching min and max zoom factors
        var minZoom;
        var maxZoom;

        // DEFINE FUNCTIONS/OBJECTS
        // Define map projection
        var projection = d3
          .geoEquirectangular()
          .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
          .scale([w / (2 * Math.PI)]) // scale to fit group width
          .translate([w / 2, h / 2]) // ensure centred in group
        ;

        // Define map path
        var path = d3
          .geoPath()
          .projection(projection)
        ;

        // Create function to apply zoom to countriesGroup
        function zoomed() {
            console.log("minzom " + minZoom)
            console.log("maxzom " + maxZoom)
            t = d3.event.transform;
            countriesGroup.attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
        }

        // Define map zoom behaviour
        var zoom = d3.zoom()
          .on("zoom", zoomed)
        ;

        function getTextBox(selection) {
          selection.each(function(d) {
              d.bbox = this.getBBox();
              })
          ;
        }

        // Function that calculates zoom/pan limits and sets zoom to default value 
        function initiateZoom() {
            // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
            minZoom = Math.max($("#graphzone").width() / w, $("#graphzone").height() / h);
            // set max zoom to a suitable factor of this value
            maxZoom = 20 * minZoom;
            // set extent of zoom to chosen values
            // set translate extent so that panning can't cause map to move out of viewport
            zoom
            .scaleExtent([minZoom, maxZoom])
            .translateExtent([[0, 0], [w, h]])
            ;
            // define X and Y offset for centre of map to be shown in centre of holder
            let midX = ($("#graphzone").width() - minZoom * w) / 2;
            let midY = ($("#graphzone").height() - minZoom * h) / 2;
            // change zoom transform to min zoom and centre offsets
            svg.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
        }

        // zoom to show a bounding box, with optional additional padding as percentage of box size
        function boxZoom(box, centroid, paddingPerc) {
            let minXY = box[0];
            let maxXY = box[1];
            // find size of map area defined
            let zoomWidth = Math.abs(minXY[0] - maxXY[0]);
            let zoomHeight = Math.abs(minXY[1] - maxXY[1]);
            // find midpoint of map area defined
            let zoomMidX = centroid[0];
            let zoomMidY = centroid[1];
            // increase map area to include padding
            zoomWidth = zoomWidth * (1 + paddingPerc / 100);
            zoomHeight = zoomHeight * (1 + paddingPerc / 100);
            // find scale required for area to fill svg
            let maxXscale = $("svg").width() / zoomWidth;
            let maxYscale = $("svg").height() / zoomHeight;
            let zoomScale = Math.min(maxXscale, maxYscale);
            // handle some edge cases
            // limit to max zoom (handles tiny countries)
            zoomScale = Math.min(zoomScale, maxZoom);
            // limit to min zoom (handles large countries and countries that span the date line)
            zoomScale = Math.max(zoomScale, minZoom);
            // Find screen pixel equivalent once scaled
            let offsetX = zoomScale * zoomMidX;
            let offsetY = zoomScale * zoomMidY;
            // Find offset to centre, making sure no gap at left or top of holder
            let dleft = Math.min(0, $("svg").width() / 2 - offsetX);
            let dtop = Math.min(0, $("svg").height() / 2 - offsetY);
            // Make sure no gap at bottom or right of holder
            dleft = Math.max($("svg").width() - w * zoomScale, dleft);
            dtop = Math.max($("svg").height() - h * zoomScale, dtop);
            // set zoom
            svg
            .transition()
            .duration(100)
            .call(
                zoom.transform,
                d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale)
            );
        }




        // on window resize
        $(window).resize(function() {
            // Resize SVG
            svg
            .attr("width", $("#graphzone").width())
            .attr("height", $("#graphzone").height());
            initiateZoom();
        });

        // create an SVG
        var svg = d3
            .select("#graphzone")
            .append("svg")
            // set to the same size as the "map-holder" div
            .attr("width", $("#graphzone").width())
            .attr("height", $("#graphzone").height())
            // add zoom functionality
            .call(zoom)
        ;

        console.log(json)

        // get map data
        let countriesGroup = svg.append("g").attr("id", "map");
            // add a background rectangle
            countriesGroup
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", w)
                .attr("height", h);
        
        // draw a path for each feature/country
        let countries = countriesGroup
                .selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("id", function(d, i) {
                    return "country" + d.properties.iso_a3;
                })
                .attr("class", "country")
            //  .attr("stroke-width", 10)
            //  .attr("stroke", "red")
                // add a mouseover action to show name label for feature/country
                .on("mouseover", function(d, i) {
                    d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
                })
                .on("mouseout", function(d, i) {
                    d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
                })
                // add an onclick action to zoom into clicked country
                .on("click", function(d, i) {
                    console.log(d)
                    d3.selectAll(".country").classed("country-on", false);
                    d3.select(this).classed("country-on", true);
                    boxZoom(path.bounds(d), path.centroid(d), 20);
                });
            // Add a label group to each feature/country. This will contain the country name and a background rectangle
            // Use CSS to have class "countryLabel" initially hidden
        let countryLabels = countriesGroup
                .selectAll("g")
                .data(json.features)
                .enter()
                .append("g")
                .attr("class", "countryLabel")
                .attr("id", function(d) {
                    return "countryLabel" + d.properties.iso_a3;
                })
                .attr("transform", function(d) {
                    return (
                        "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
                    );
                })
                // add mouseover functionality to the label
                .on("mouseover", function(d, i) {
                    d3.select(this).style("display", "block");
                })
                .on("mouseout", function(d, i) {
                    d3.select(this).style("display", "none");
                })
                // add an onlcick action to zoom into clicked country
                .on("click", function(d, i) {
                    console.log(d)
                    d3.selectAll(".country").classed("country-on", false);
                    d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
                    boxZoom(path.bounds(d), path.centroid(d), 20);
                });
            // add the text to the label group showing country name
            countryLabels
                .append("text")
                .attr("class", "countryName")
                .style("text-anchor", "middle")
                .attr("dx", 0)
                .attr("dy", 0)
                .text(function(d) {
                    return d.properties.name;
                })
                .call(getTextBox);
            // add a background rectangle the same size as the text
            countryLabels
                .insert("rect", "text")
                .attr("class", "countryLabelBg")
                .attr("transform", function(d) {
                    return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
                })
                .attr("width", function(d) {
                    return d.bbox.width + 4;
                })
                .attr("height", function(d) {
                    return d.bbox.height;
                });

            initiateZoom();       

    }
    return graph;
});

