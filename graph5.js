function reduceAdd(p,v) {
    ++count;
    p.total += +v["salary"];
    p.average = p.total / p.count;
    return p;

}

function reduceRemove (p,v) {
    --p.count;
    if(p.count == 0) {
        p.total = 0;
        p.average = 0;
    }
    
    else {
        p.total -= v["salary"];
        p.average = p.total / p.count;
    }
    
    return p;
}

function reduceInit(){
    return{ count:0, total: 0, average: 0  };
}

let totalSalary = yrsServiceDim.group().reduce(reduceAdd(p.v), reduceRemove(p,v), reduceInit());