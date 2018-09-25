'use strict';


define('candle', ['d3'], function (d3) {
    let candle = {};
    
    candle.init = function(){
        candle.t01();
        candle.t02();
    }

    //http://nvd3-community.github.io/nvd3/examples/site.html
    //https://github.com/nvd3-community/nvd3/blob/gh-pages/examples/candlestick.html
    //https://github.com/novus/nvd3/blob/master/src/models/candlestickBar.js
    
    // nvd3(angular) - candle ex
    //http://krispo.github.io/angular-nvd3/#/candlestickBarChart
    //https://github.com/krispo/angular-nvd3

    // 가로 스케일 과 줌
    //https://bl.ocks.org/evanjmg/7c43c37b1f7752a1ff438109f655bed3
    // 타임라인 과 줌
    // http://bl.ocks.org/TBD/600b23e56545026ae6fda2905efa42ce

    // axis rescale
    // http://bl.ocks.org/stepheneb/1182434

    // axis rescale example
    // http://jsfiddle.net/r19LL1a4/40/

    // d3 y axis rescale
    // https://stackoverflow.com/questions/47123744/d3-v4-brush-and-zoom-rescale-y-axis
    // http://jsfiddle.net/r19LL1a4/40/

    // v2 rescale
    // http://bl.ocks.org/stepheneb/1182434

    // 가로 줌만 하게
    // https://stackoverflow.com/questions/39306515/horizontal-zoom-with-d3-version-4

    // simple ex
    // https://bl.ocks.org/rutgerhofste/5bd5b06f7817f0ff3ba1daa64dee629d

    // selection Filter
    // http://www.d3noob.org/2013/01/selecting-filtering-subset-of-objects.html

    // zoom pan 초기화 문제
    // https://stackoverflow.com/questions/39688256/force-layout-zoom-resets-on-first-tick-of-dragging-or-zomming
    candle.t01 = async function(){
        var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        t = 20; // threshold
        
        var minZoom;
        var maxZoom;
        

        // Data
        ////////////////////////////////////////////////
        // date open close heigh low volume
        //   0   1     2     3    4   5
        let initData = await d3.json("bitfinex_btcusd_3H.json");
        let data; 
        const iDate = 1530785032258;
                
        let setData = function(minDate){
            data = initData.reduce(function(acc, cur){
                if(minDate <= cur[0]) acc.push(cur)
                return acc;
            }, []);
            console.log("setData")
        }
        setData(iDate)
        
        // InnerFunction
        ////////////////////////////////////////////////
        let maxDate = d3.max(data.map(function(d){return d[0]}))
        let minDate = d3.min(data.map(function(d){return d[0]}))
        let maxPrice = d3.max(data.map(function(d){return d[3]}))
        let minPrice = d3.min(data.map(function(d){return d[4]}))

        const yscale = d3.scaleLinear()
        .domain([minPrice, maxPrice])
        .range([height - margin.top, margin.bottom])  

        var xscale = d3.scaleTime()
        .domain([new Date(minDate), new Date(maxDate)]) //범위를 날짜로
        .range([margin.left+10, width + margin.left]); //위의 y축이 가로50을 차지했으니 그만큼 밀자                

        const candleHeight = function(d){
            let heighPrice = d[3]
            let lowPrice = d[4]
            let maxY = yscale(heighPrice);
            let minY = yscale(lowPrice);
            return (minY-maxY)
        }   
     
        let curMinDate;
        let curMaxDate;
        const setRageDate = function(minDate, maxDate){
            curMinDate=minDate;
            curMaxDate=maxDate;
        }
        const isRangeDate = function(d){
            if(curMinDate == null || curMaxDate == null){
                console.log("isRangeDate true by undefine")
                return true;
            }

            if(d[0] <= curMaxDate && d[0] >= curMinDate){
                return true    
            }
            return false
        }

        let curMinPrice;
        let curMaxPrice;
        const setRagePrice = function(minPrice, maxPrice){
            curMinPrice=minPrice;
            curMaxPrice=maxPrice;
        }        
        // Test
        /////////////////////////////////////////////////

        // Binding
        ////////////////////////////////////////////////
        let canvas = d3.select("#graphzone")
            .append("svg")
            .attr("width",  width + margin.left + margin.right)
            .attr("height",  height + margin.top + margin.bottom);          
        
        let group = canvas.append("g") 
            //.attr("transform","translate(" + margin.left +"," + margin.top +")");
            //.attr("transform","translate(" + [-535, 0] + ")scale(" + 50 + ",1)");
            // group.attr("transform","scale(" + 3 + ",1)");
        // [1] 포지션은 height price에서 잡느다 좌표가 좌에서 우로, 위에서 아래로 증가 하기에
        var tick
        // var txt
        var lines
        var bar

        let enter = function(){
            tick = group.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("id" , function(d){ return d[0]})
            // txt = tick.append("text")
            lines = tick.append('line')
            bar = tick.append("rect")
        }

        let update = function(){
            tick = group.selectAll("g")
            .filter(function(d) { return isRangeDate(d) }) 
            tick.attr("transform", function(d) { 
                d.parent = {};
                d.parent.y = yscale(d[3])
                return "translate(" + xscale(d[0]) + "," + yscale(d[3]) + ")"; 
            })
            // txt = tick.selectAll("text");
            // txt
            //     .text(function(d) {return d[4]})
            //     .attr("x", 0)
            //     .attr("y", function(d){ return candleHeight(d)})
            //     .style("font-size", "15px")

            // [2] heightPrice(좌표) - minPrice (좌표) 해서 heightPrice 포지션에서 밑으로 그린다.
            lines = tick.selectAll("line")
            lines
                .attr('class', 'nv-candlestick-lines')
                //.attr('transform', function(d, i) { return 'translate(' + xaxis(d[1]) + ',0)'; })
                .attr('x1', 0)
                .attr('y1', function(d, i) {
                    return 0; 
                    })
                .attr('x2', 0)
                .attr('y2', function(d, i) {
                    return candleHeight(d);
                    })
                .attr("stroke", function(d,i){
                    let start = d[1];
                    let close = d[2];
                    if(start > close){
                        return "red"
                    }else{
                        return "green"
                    }
                })
                .attr("stroke-width", 1)

            // [3] 바는 시작포지션은 언제나 start 이다.
            bar = tick.selectAll("rect");
            bar
                .attr("x", -2)   
                .attr("y", function(d,i){
                    let parentY = yscale(d[3])
                    let openY = yscale(d[1]) 
                    let closeY = yscale(d[2])
                    let y = 0
                    if(closeY < openY){
                        y = closeY - parentY;
                    } else{
                        y = openY - parentY;
                    }
                    
                    return y
                })
                .attr("width", 4)
                .attr("height", function(d,i) {
                    let start = d[1];
                    let close = d[2];
                    let startY = yscale(start) 
                    let closeY = yscale(close)
                    // 양봉
                    let height = 0;
                    if (closeY > startY) {
                        height = closeY - startY
                    } else {
                        height = startY - closeY
                    }
                    return height;
                })
                .attr("fill", function(d,i){
                    let start = d[1];
                    let close = d[2];
                    if(start > close){
                        return "red";
                    }else{
                        return "green"
                    }
                });                
        }

        // 초기화
        enter();
        update();

        const xaxis = d3.axisBottom(xscale)
            .tickFormat(d3.timeFormat('%m/%d')) //표시할 형태를 포메팅한다.
            //.ticks(d3.timeDay) //틱단위를 1일로
            .ticks(d3.timeMinute.every(30))
            .ticks(30)


        const yaxis = d3.axisLeft(yscale)
        .ticks(30)
        
        let gY= canvas.append("g")
        .attr("transform", "translate("+margin.left+",0)")
        gY.call(yaxis);
       
        
        let gX = canvas.append("g")
        .attr("transform", "translate(0,"+height+")")
        .call(xaxis);

        // Zoom
        ////////////////////////////////////////////////
        function zoomed(time) {
            let new_xScale
            let minTime
            let maxTime
            if(time == null || time == undefined){
                new_xScale = d3.event.transform.rescaleX(xscale);
                minTime = new_xScale.domain()[0].getTime();
                maxTime = new_xScale.domain()[1].getTime();
            } else {
                new_xScale = d3.scaleTime().domain([time.min, time.max]).range([margin.left+10, width + margin.left]);;
                
                minTime = time.min;
                maxTime = time.max;
            }

            if(minDate > minTime){
                minDate = minTime
                setData(minTime);
                enter();    
            }
            
            // update Cur Date
            setRageDate(minTime, maxTime)
            //console.log(minTime, maxTime)

            let new_data = []
            data.map(function(d){
                if(d[0] <= maxTime && d[0] >= minTime){
                    new_data.push(d)
                }                
            })

            let maxPrice = d3.max(new_data.map(function(d){return d[3]}));
            let minPrice = d3.min(new_data.map(function(d){return d[4]}));

            let flag = false
            if(curMinPrice!= minPrice || curMaxPrice != maxPrice){
                setRagePrice(minPrice,maxPrice)
                yscale.domain([minPrice, maxPrice]);
                flag = true
            }
            // update axes
            gX.call(xaxis.scale(new_xScale));
            gY.call(yaxis.scale(yscale));

            // update group
            if(time == null || time == undefined){
                t = d3.event.transform;
                 console.log(t);
                group.attr("transform","translate(" + [t.x, 0] + ")scale(" + t.k + ",1)");
            }  
            
            if(flag){
                update();
                console.log("updated")
            }
        }

        function zoomed2(){
            t = d3.event.transform;
            group.attr("transform","translate(" + [t.x, 0] + ")scale(" + t.k + ",1)");
        }
        // Define map zoom behaviour
        var zoom = d3.zoom()
          .on("zoom", zoomed)
        ;

        // Function that calculates zoom/pan limits and sets zoom to default value 
        function initiateZoom() {
            // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
            minZoom = Math.max($("#graphzone").width() / width, $("#graphzone").height() / height);
            // set max zoom to a suitable factor of this value
            maxZoom = 20 * minZoom;
            // set extent of zoom to chosen values
            // set translate extent so that panning can't cause map to move out of viewport
            zoom
            .scaleExtent([minZoom, maxZoom])
            .translateExtent([[0, 0], [width, height]])
            ;
            // define X and Y offset for centre of map to be shown in centre of holder
            let midX = ($("#graphzone").width() - minZoom * width) / 2;
            let midY = ($("#graphzone").height() - minZoom * height) / 2;
            // change zoom transform to min zoom and centre offsets
            canvas.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
        }          

        canvas.call(zoom);        

        var btnFunc = function(){
            let obj = {};
            let min = 1505563121439;
            let max = 1516678845681;
            obj.min = min;
            obj.max = max;
            console.log(obj);
            zoomed(obj);
            t = {k: 0.10881882041201549, x: 2170.9183114319576, y: 116.74249051912986}
            canvas.call(zoom.transform, d3.zoomIdentity.translate(t.x, t.y).scale(t.k));
        }
        d3.select("#button03").on("click", btnFunc);
    }

    candle.t02 = async function(){
        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 110, left: 40},
        margin2 = {top: 430, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        height2 = +svg.attr("height") - margin2.top - margin2.bottom;
    
        var parseDate = d3.timeParse("%b %Y");
        
        var x = d3.scaleTime().range([0, width]),
            x2 = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            y2 = d3.scaleLinear().range([height2, 0]);
        
        var xAxis = d3.axisBottom(x),
            xAxis2 = d3.axisBottom(x2),
            yAxis = d3.axisLeft(y);
        
        var brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("brush end", brushed);
        
        var zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);
        
        var area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.price); });
        
        var area2 = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x2(d.date); })
            .y0(height2)
            .y1(function(d) { return y2(d.price); });
        
        svg.append("defs").append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("width", width)
            .attr("height", height);
        
        var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
        
        var dataperm;
        let data = await d3.csv('https://gist.githubusercontent.com/mbostock/34f08d5e11952a80609169b7917d4172/raw/8c077d84249752e4ed16354aa25040590243ce4b/sp500.csv', type) 
        
        dataperm = data;
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.price; })]);
        x2.domain(x.domain());
        y2.domain(y.domain());
        
        focus.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area);
        
        focus.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        focus.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);
        
        context.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area2);
        
        context.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);
        
        context.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, x.range());
        
        svg.append("rect")
            .attr("class", "zoom")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoom);
        
        
        function brushed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || x2.range();
        x.domain(s.map(x2.invert, x2));
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        focus.select(".axis--y").call(yAxis);
        svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0));
        }
        
        function zoomed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = d3.event.transform;
        var x2Domain = t.rescaleX(x2)
            x.domain(x2Domain.domain());
        var domain= x.domain();
                
        y.domain([d3.min(dataperm.map(function(d) { 	  
                if(parseInt(d.date.getTime())> parseInt(domain[0].getTime()) && parseInt(d.date.getTime()) < parseInt(domain[1].getTime())){
                return parseFloat(d.price);  
                }})), d3.max(dataperm.map(function(d) { 
                
                if(parseInt(d.date.getTime())> parseInt(domain[0].getTime()) && parseInt(d.date.getTime()) < parseInt(domain[1].getTime())){
                return d.price;
            }}))]);   
        //console.log(x[1]);
        //console.log(d3.max(dataperm.map.x(function(d) { return d.price; })));
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        focus.select(".axis--y").call(yAxis);
        
        context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }
        
        function type(d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
        return d;
        }        
    }

    return candle;
})