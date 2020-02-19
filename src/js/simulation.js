
function verifyPercentages() {
    return  100 === (Number(document.getElementById("x1_S").value) + Number(document.getElementById("x1_R").value) + Number(document.getElementById("x1_L").value));
}

/**
 * Accept user parameters.
 */
function submitClicked() {
    if(!verifyPercentages())
        alert("Percentages do not add up to 100 percent, please try again");
    else {
        let trafficModel = getTrafficModelFromInputs();

    }
}

function updateFlowAmounts(trafficModel) {
    let ns_left_in = (trafficModel.NS_rate * trafficModel.leftFlow * trafficModel.getTotalCycleTime());
    let ns_left_out = (trafficModel.getTotalCarOnGreenCycle(trafficModel.NS_Left));
    document.getElementById("ns_left_in").innerHTML = ns_left_in.toFixed(0);
    document.getElementById("ns_left_out").innerHTML = ns_left_out.toFixed(0);
    if(ns_left_in > ns_left_out) {
        document.getElementById("ns_left_in").classList.add('error');
    } else {
        document.getElementById("ns_left_in").classList.remove('error');
    }

    document.getElementById("ns_green_in").innerHTML = (trafficModel.NS_rate * trafficModel.greenFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ns_green_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.NS_Green)).toFixed(0).toString();

    document.getElementById("ew_left_in").innerHTML = (trafficModel.EW_rate * trafficModel.leftFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ew_left_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.EW_Left)).toFixed(0).toString();

    document.getElementById("ew_green_in").innerHTML = (trafficModel.EW_rate * trafficModel.greenFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ew_green_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.EW_Green)).toFixed(0).toString();
}

function getTrafficModelFromInputs() {
    let modelInit = {};
    modelInit.straightFlow = Number(document.getElementById("x1_S").value)/100.0;
    modelInit.rightFlow = Number(document.getElementById("x1_R").value)/100.0;
    modelInit.leftFlow = Number(document.getElementById("x1_L").value)/100.0;
    modelInit.reactionTime = 2;
    modelInit.environmentModifer = 1;
    modelInit.peakFlow = 70;
    modelInit.timeToPeak = 5; // This number will probably be between 5-20. Think of this as a speed coefficent. It shifts the whole curve. Smaller number is more acceleration
    modelInit.X1 = Number(document.getElementById("input1").value);
    modelInit.X3 = Number(document.getElementById("input3").value);
    modelInit.X2 = Number(document.getElementById("input2").value);
    modelInit.X4 = Number(document.getElementById("input4").value);
    modelInit.NS_Green = Number(document.getElementById("state1").value);
    modelInit.NS_Left = Number(document.getElementById("state3").value);
    modelInit.EW_Green = Number(document.getElementById("state2").value);
    modelInit.EW_Left = Number(document.getElementById("state4").value);

    if (document.getElementById("feature1").checked) {
        modelInit = modifyTraffic(modelInit, .67, NaN, NaN)
    } else if (document.getElementById("feature2").checked) {
        modelInit = modifyTraffic(modelInit, .33, NaN, NaN)
    } else if (document.getElementById("feature3").checked) {
        modelInit = modifyTraffic(modelInit, .55, NaN, NaN)
    } else if (document.getElementById("feature4").checked) {
        modelInit = modifyTraffic(modelInit, .75, 6, 3)
    } else if (document.getElementById("feature5").checked) {
        modelInit = modifyTraffic(modelInit, .80, 5.5, 2.5)
    } else if (document.getElementById("feature6").checked) {
        modelInit = modifyTraffic(modelInit, .3015, NaN, NaN)
    }

    console.log(modelInit);

    return new TrafficModel(modelInit);
}
/**
 * Begins the global simulation time.
 */
function startSimulation() {
    updateSim();
}

function updateSim() {
    if (document.getElementById("state1").value != null && document.getElementById("state1").value > 0 &&
        document.getElementById("state2").value != null && document.getElementById("state2").value > 0 &&
        document.getElementById("state3").value != null && document.getElementById("state3").value > 0 &&
        document.getElementById("state4").value != null && document.getElementById("state4").value > 0) {
        document.getElementById("cycle_time_warning").innerText = null;

        let trafficModel = getTrafficModelFromInputs()
        updateFlowAmounts(trafficModel);
        updateCharts(trafficModel);
    } else {
        document.getElementById("cycle_time_warning").innerText = "Error: Must supply cycle times.";
    }
}

/**
 * This function updates the environmentModifier and timeToPeak values as part of user features.
 */
function modifyTraffic(modelInit, environmentModifier, timeToPeak, reactionTime){
    modelInit.environmentModifer = environmentModifier;
    if (!isNaN(timeToPeak)){
        modelInit.timeToPeak = timeToPeak;
    }
    if (!isNaN(reactionTime)){
        modelInit.reactionTime = reactionTime;
    }
    return modelInit;
}






