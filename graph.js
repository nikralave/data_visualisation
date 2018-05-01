queue()
.defer(d3.json, "data/transactions.json")
.await(makeGraph);

function makeGraph(error, transactionsData) {
    let ndx = crossfilter(transactionsData);
    
    let parseDate = d3.time.format("%d/%m/%Y").parse;
    
    transactionsData.forEach(function(d){
        d.date = parseDate(d.date);
    });
    
    let dateDim = ndx.dimension(dc.pluck("date"));
    
    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;
    
    let tomSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.name === "Tom") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
    let aliceSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.name === "Alice") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
    let bobSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.name === "Bob") {
                return +d.spend;
            } else {
                return 0;
            }
        });
        
        
    let compositeChart = dc.compositeChart("#composite-chart")
    
    compositeChart
    .width(1000)
    .height(200)
    .dimension(dateDim)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .yAxisLabel("Spend")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
    dc.lineChart(compositeChart)
    .colors("green")
    .group(tomSpend, "Tom"),
    dc.lineChart(compositeChart)
    .colors("red")
    .group(bobSpend, "Bob"),
    dc.lineChart(compositeChart)
    .colors("blue")
    .group(aliceSpend, "Alice"),
     ])
     .render()
     .yAxis().ticks(4);
     
     dc.renderAll();
     
   
    let caSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.state === "CA") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
    let flSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.state === "FL") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
    let nySpend = dateDim.group().reduceSum(
        function(d) {
            if (d.state === "NY") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
        
        
        let tnSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.state === "TN") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
        
        
        let wiSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.state === "WI") {
                return +d.spend;
            } else {
                return 0;
            }
        });
        
        
    let compositeChartState = dc.compositeChart("#composite-chart-state")
    
    compositeChartState
    .width(1000)
    .height(200)
    .dimension(dateDim)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .yAxisLabel("Spend")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
    dc.lineChart(compositeChartState)
    .colors("green")
    .group(caSpend, "CA"),
    dc.lineChart(compositeChartState)
    .colors("red")
    .group(flSpend, "FL"),
    dc.lineChart(compositeChartState)
    .colors("blue")
    .group(nySpend, "NY"),
     dc.lineChart(compositeChartState)
    .colors("yellow")
    .group(tnSpend, "TN"),
     dc.lineChart(compositeChartState)
    .colors("orange")
    .group(wiSpend, "WI")
     ])
     .render()
     .yAxis().ticks(4);
     
   
    dc.renderAll();
    
    
    
    
      let aSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.store === "A") {
                return +d.spend;
            } else {
                return 0;
            }
        })
        
    let bSpend = dateDim.group().reduceSum(
        function(d) {
            if (d.store === "B") {
                return +d.spend;
            } else {
                return 0;
            }
        });
        
        
    let compositeChartStore = dc.compositeChart("#composite-chart-store")
    
    compositeChartStore
    .width(1000)
    .height(200)
    .dimension(dateDim)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .yAxisLabel("Spend")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
    dc.barChart(compositeChartStore)
    .colors("blue")
    .group(aSpend, "A"),
    dc.barChart(compositeChartStore)
    .colors("yellow")
    .group(bSpend, "B"),
     ])
     .render()
     .yAxis().ticks(4);
     
    
     dc.renderAll();
     
     
     
    
    
}

