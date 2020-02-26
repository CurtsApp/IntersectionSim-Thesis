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
    for(let i = 0; i <= length; i++) {
        data.push(height);
    }
    return data;
}

function getNSLeftData(trafficModel) {
    return {
        labels: getLabels(trafficModel.stepSize, trafficModel.getTotalCycleTime()),
        datasets: [{
            label: 'Out Flow',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.NS_Left_Start, trafficModel.NS_Left_End, trafficModel),
        }, {
            label: 'In Flow',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: getFlowLine( trafficModel.NS_rate * trafficModel.leftFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
            fill: true,
        }]
    };
}

function getNSGreenData(trafficModel) {
    return {
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
            data: getFlowLine( trafficModel.NS_rate * trafficModel.greenFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
            fill: true,
        }]
    };
}

function getEWLeftData(trafficModel) {
    return {
        labels: getLabels(trafficModel.stepSize, trafficModel.getTotalCycleTime()),
        datasets: [{
            label: 'Out Flow',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.EW_Left_Start, trafficModel.EW_Left_End, trafficModel),
        }, {
            label: 'In Flow',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: getFlowLine( trafficModel.EW_rate * trafficModel.leftFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
            fill: true,
        }]
    };
}

function getEWGreenData(trafficModel) {
    return {
        labels: getLabels(trafficModel.stepSize, trafficModel.getTotalCycleTime()),
        datasets: [{
            label: 'Out Flow',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.EW_Green_Start, trafficModel.EW_Green_End, trafficModel),
        }, {
            label: 'In Flow',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: getFlowLine( trafficModel.EW_rate * trafficModel.greenFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
            fill: true,
        }]
    };
}

function getTrafficData(direction, trafficModel) {
    switch(direction) {
        case 'ns_green':
            return getNSGreenData(trafficModel);
        case 'ns_left':
            return getNSLeftData(trafficModel);
        case 'ew_green':
            return getEWGreenData(trafficModel);
        case 'ew_left':
            return getEWLeftData(trafficModel);
    }
}

function getTrafficTitle(direction) {
    switch(direction) {
        case 'ns_green':
            return {
                display: true,
                text: 'Intersection Traffic N / S Green'
            };
        case 'ns_left':
            return {
                display: true,
                text: 'Intersection Traffic N / S Left'
            };
        case 'ew_green':
            return {
                display: true,
                text: 'Intersection Traffic E / W Green'
            };
        case 'ew_left':
            return {
                display: true,
                text: 'Intersection Traffic E / W Left'
            };
    }
}

function drawCharts(trafficModel) {
    let chart_config = {
        type: 'line',

        data: getTrafficData('ns_green', trafficModel),
        options: {
            responsive: true,
            title: getTrafficTitle('ns_green'),
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
                        max: trafficModel.peakFlow,
                        stepSize: 10
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById('Chart_Canvas').getContext('2d');
    window.traffic_chart = new Chart(ctx, chart_config);

}

function updateCharts(trafficModel, direction) {
    if(!window.traffic_chart) {
        drawCharts(trafficModel);
    } else {
        window.traffic_chart.data = getTrafficData(direction, trafficModel);
        window.traffic_chart.title = getTrafficTitle(direction);

        window.traffic_chart.update();

    }

}

