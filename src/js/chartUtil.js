function getLabels(stepSize, max) {
    let labels = [];
    for(let i = 0; i <= max; i += stepSize) {
        labels.push(i);
    }
    return labels;
}

function getAccelCurve(stepSize,max, start, end, model) {
    let data = [];
    for(let i = 0; i <= max; i += stepSize) {
        if(i >= start && i <= end) {
            data.push(model.getAccelAtTime(i - start));
        } else {
           data.push(0);
        }

    }
    return data;
}

function getFlowLine(height, length) {
    let data = [];
    for(let i = 0; i < length; i++) {
        data.push(height);
    }
    return data;
}

function drawCharts(trafficModel) {
    console.log("CHARTS");
    console.log(trafficModel);
    var x1Config = {
        type: 'line',

        data: {
            labels: getLabels(trafficModel.stepSize, trafficModel.getTotalCycleTime()),
            datasets: [{
                label: 'Out Flow',
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.NS_Green_Start, trafficModel.NS_Green_End, trafficModel),
            }, {
                label: 'In Flow',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: getFlowLine( trafficModel.X1, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic X1'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (seconds)'
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Traffic Flow (cars/second)'
                    }
                },
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        max: trafficModel.peakFlow + 10,
                        stepSize: 10
                    }
                }]
            }
        }
    };
    let ctx = document.getElementById('x1Canvas').getContext('2d');
    window.x1Chart = new Chart(ctx, x1Config);

}

function updateCharts(trafficModel) {
    if(!window.x1Chart) {
        drawCharts(trafficModel);
    } else {
        window.x1Chart.data.datasets[0] = {
            label: 'Out Flow',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.NS_Green_Start, trafficModel.NS_Green_End, trafficModel),
        };
        window.x1Chart.update();
    }

}

