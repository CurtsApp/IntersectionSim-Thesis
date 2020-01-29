function getLabels(stepSize, length) {
    let x = 0;
    let labels = [];
    for(let i = 0; i < length; i++) {
        labels.push(x);
        x += stepSize;
    }
    return labels;
}

function getAccelCurve(stepSize,length) {
    let x = 0;
    let data = [];
    for(let i = 0; i < length; i++) {
        data.push(getAccelAtTime(x));
        x += stepSize;
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

function initChart() {
    let maxTime = 30;
    var config = {
        type: 'line',
        data: {
            labels: getLabels(1, maxTime),
            datasets: [{
                label: 'Out Flow',
                fill: false,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: getAccelCurve(1, maxTime),
            }, {
                label: 'In Flow',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: getFlowLine( 30, maxTime),
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic'
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
                        labelString: 'Month'
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }
            }
        }
    };
    let ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

}
