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


    //-----------------------------------------------------------------------------           

    let genderSalaryDim = ndx.dimension(dc.pluck('sex'));
    let totalSalaryGender = genderSalaryDim.group().reduceSum(dc.pluck('salary'));

    let genderSalaryChart = dc.barChart("#gender-salary-chart");

        genderSalaryChart
            .width(500)
            .height(200)
            .dimension(genderSalaryDim)
            .group(totalSalaryGender)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .yAxis().ticks(4);

    //-----------------------------------------------------------------             
    let yearsDim = ndx.dimension(function(d) {
        return +d["yrs.service"];
    });



    let maleSalary = yearsDim.group().reduce(
        function(p, v) {
            if (v.sex === "Male") {
                ++p.count;
                p.total += +v["salary"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function(p, v) {
            if (v.sex === "Male") {
                --p.count;
                if (p.count == 0) {
                    p.total = 0;
                    p.average = 0;
                }
                else {
                    p.total -= v["salary"];
                    p.average = p.total / p.count;
                }
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );

    let femaleSalary = yearsDim.group().reduce(
        function(p, v) {
             if (v.sex === "Female") {
            ++p.count;
            p.total += +v["salary"];
            p.average = p.total / p.count;
             }
            return p;
        },
        function(p, v) {
            if (v.sex === "Female") {
            --p.count;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v["salary"];
                p.average = p.total / p.count;
            }
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );




    let compositeChart = dc.compositeChart("#salary-chart")

    compositeChart
        .width(1000)
        .height(200)
        .dimension(yearsDim)
        .x(d3.scale.linear().domain([0, 60]))
        .yAxisLabel("Salary")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .valueAccessor(function(p) {
                return p.value.average;
            })
            .colors("blue")
            .group(maleSalary, "Male"),
            dc.lineChart(compositeChart)
            .valueAccessor(function(p) {
                return p.value.average;
            })
            .colors("pink")
            .group(femaleSalary, "Female"),
        ])

        .render()
        .yAxis().ticks(4);

    //-------------------------------------------------------------------------

    let yrsServiceDim = ndx.dimension(function(d) {
        return +d["yrs.service"];
    });
    let totalSalary = yrsServiceDim.group().reduce(
        function(p, v) {
            ++p.count;
            p.total += +v["salary"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            --p.count;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v["salary"];
                p.average = p.total / p.count;
            }
            return p;
        },
        function() {
            return { count: 0, total: 0, average: 0 };
        }
    );
    let salaryChart = dc.barChart("#service-salary-chart");
    salaryChart
        .width(1000)
        .height(450)
        .dimension(yrsServiceDim)
        .group(totalSalary)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Years Service")
        .valueAccessor(function(p) {
            return p.value.average;
        })
        .yAxis().ticks(4);


   



    dc.renderAll();

}
