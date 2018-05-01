queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraph);

function makeGraph(error, SalariesData) {
    let ndx = crossfilter(SalariesData);

    
     let genderDim = ndx.dimension(dc.pluck("sex"));
            let totalMaleFemaleRatio = genderDim.group().reduceCount(dc.pluck("sex"));
            
            let genderChart = dc.pieChart("#gender-chart");
                genderChart
                .height(500)
                .radius(200)
                .dimension(genderDim)
                .group(totalMaleFemaleRatio)
                
                
                

        let genderSalaryDim = ndx.dimension(dc.pluck('sex'));
        let totalSalary = genderSalaryDim.group().reduceSum(dc.pluck('salary'));

        let salaryChart = dc.barChart("#salary-chart");

            salaryChart
                .width(500)
                .height(200)
                .dimension(genderSalaryDim)
                .group(totalSalary)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("Gender")
                .yAxis().ticks(4);
                
                
    // let yearsDim = ndx.dimension(dc.pluck("yrs.service"));
    // let maleSalary = yearsDim.group().reduceSum(
    //     function(d) {
    //         if (d.sex === "Male") {
    //             return +d.salary;
    //         } else {
    //             return 0;
    //         }
    //     })
        
    // let femaleSalary = yearsDim.group().reduceSum(
    //     function(d) {
    //         if (d.sex === "Female") {
    //             return +d.salary;
    //         } else {
    //             return 0;
    //         }
    //     });
        
   
        
        
    // let compositeChart = dc.compositeChart("#salary-chart")
    
    // compositeChart
    // .width(1000)
    // .height(200)
    // .dimension(yearsDim)
    // .x(d3.scale.linear().domain([0,100]))
    // .yAxisLabel("Years Service")
    // .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    // .renderHorizontalGridLines(true)
    // .compose([
    // dc.lineChart(compositeChart)
    // .colors("green")
    // .group(maleSalary, "Male"),
    // dc.lineChart(compositeChart)
    // .colors("red")
    // .group(femaleSalary, "Female"),
    //  ])
    //  .render()
    //  .yAxis().ticks(4);
     
                
    
        
        

     
    
    

    
    dc.renderAll();

}
