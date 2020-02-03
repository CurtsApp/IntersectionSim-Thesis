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

function drawCharts(trafficModel) {
    var NS_Left_Config = {
        type: 'line',

        data: {
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
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic N / S Left'
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
                        max: trafficModel.peakFlow,
                        stepSize: 10
                    }
                }]
            }
        }
    };

    var NS_Green_Config = {
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
                data: getFlowLine( trafficModel.NS_rate * trafficModel.straightFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic N / S Green'
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
                        max: trafficModel.peakFlow,
                        stepSize: 10
                    }
                }]
            }
        }
    };

    var EW_Left_Config = {
        type: 'line',

        data: {
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
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic E / W Left'
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
                        max: trafficModel.peakFlow,
                        stepSize: 10
                    }
                }]
            }
        }
    };

    var EW_Green_Config = {
        type: 'line',

        data: {
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
                data: getFlowLine( trafficModel.EW_rate * trafficModel.straightFlow, trafficModel.getTotalCycleTime() / trafficModel.stepSize),
                fill: true,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Intersection Traffic E / W Green'
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
                        max: trafficModel.peakFlow,
                        stepSize: 10
                    }
                }]
            }
        }
    };
    let ns_left_ctx = document.getElementById('NS_Left_Canvas').getContext('2d');
    window.ns_left_chart = new Chart(ns_left_ctx, NS_Left_Config);
    let ns_green_ctx = document.getElementById('NS_Green_Canvas').getContext('2d');
    window.ns_green_chart = new Chart(ns_green_ctx, NS_Green_Config);
    let ew_left_ctx = document.getElementById('EW_Left_Canvas').getContext('2d');
    window.ew_left_chart = new Chart(ew_left_ctx, EW_Left_Config);
    let ew_green_ctx = document.getElementById('EW_Green_Canvas').getContext('2d');
    window.ew_green_chart = new Chart(ew_green_ctx, EW_Green_Config);

}

function updateCharts(trafficModel) {
    if(!window.ns_green_chart) {
        drawCharts(trafficModel);
    } else {
        window.ns_green_chart.data.datasets[0] = {
            label: 'Out Flow',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: getAccelCurve(trafficModel.stepSize, trafficModel.getTotalCycleTime(), trafficModel.NS_Green_Start, trafficModel.NS_Green_End, trafficModel),
        };
        window.ns_green_chart.update();
    }

}

