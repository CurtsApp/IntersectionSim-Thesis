
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
    let verify = trafficModel.verify();
    let ns_left_in = (trafficModel.NS_rate * trafficModel.leftFlow * trafficModel.getTotalCycleTime());
    let ns_left_out = (trafficModel.getTotalCarOnGreenCycle(trafficModel.NS_Left));
    document.getElementById("ns_left_in").innerHTML = ns_left_in.toFixed(0);
    document.getElementById("ns_left_out").innerHTML = ns_left_out.toFixed(0);
    if(!verify.NS_Left) {
        document.getElementById("ns_left_in").classList.add('error');
        document.getElementById("state3").classList.add('error-b');
    } else {
        document.getElementById("ns_left_in").classList.remove('error');
        document.getElementById("state3").classList.remove('error-b');
    }

    document.getElementById("ns_green_in").innerHTML = (trafficModel.NS_rate * trafficModel.greenFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ns_green_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.NS_Green)).toFixed(0).toString();
    if(!verify.NS_Green) {
        document.getElementById("ns_green_in").classList.add('error');
        document.getElementById("state1").classList.add('error-b');
    } else {
        document.getElementById("ns_green_in").classList.remove('error');
        document.getElementById("state1").classList.remove('error-b');
    }

    document.getElementById("ew_left_in").innerHTML = (trafficModel.EW_rate * trafficModel.leftFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ew_left_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.EW_Left)).toFixed(0).toString();
    if(!verify.EW_Left) {
        document.getElementById("ew_left_in").classList.add('error');
        document.getElementById("state4").classList.add('error-b');
    } else {
        document.getElementById("ew_left_in").classList.remove('error');
        document.getElementById("state4").classList.remove('error-b');
    }

    document.getElementById("ew_green_in").innerHTML = (trafficModel.EW_rate * trafficModel.greenFlow * trafficModel.getTotalCycleTime()).toFixed(0).toString();
    document.getElementById("ew_green_out").innerHTML = (trafficModel.getTotalCarOnGreenCycle(trafficModel.EW_Green)).toFixed(0).toString();
    if(!verify.EW_Green) {
        document.getElementById("ew_green_in").classList.add('error');
        document.getElementById("state2").classList.add('error-b');
    } else {
        document.getElementById("ew_green_in").classList.remove('error');
        document.getElementById("state2").classList.remove('error-b');
    }



    if(verify.NS_Left && verify.NS_Green && verify.EW_Left && verify.EW_Green) {
        document.getElementById("out_table").classList.remove('error-b');
    } else {
        document.getElementById("out_table").classList.add('error-b');
    }
}

function getTrafficModelFromInputs() {
    let modelInit = {};
    modelInit.straightFlow = Number(document.getElementById("x1_S").value)/100.0;
    modelInit.rightFlow = Number(document.getElementById("x1_R").value)/100.0;
    modelInit.leftFlow = Number(document.getElementById("x1_L").value)/100.0;
    modelInit.reactionTime = 2;
    modelInit.environmentModifer = 1;
    modelInit.peakFlow = 1.5;
    modelInit.timeToPeak = 20; // This number will probably be between 5-20. Think of this as a speed coefficent. It shifts the whole curve. Smaller number is more acceleration
    modelInit.X1 = Number(document.getElementById("input1").value)/60.0;
    modelInit.X3 = Number(document.getElementById("input3").value)/60.0;
    modelInit.X2 = Number(document.getElementById("input2").value)/60.0;
    modelInit.X4 = Number(document.getElementById("input4").value)/60.0;
    modelInit.NS_Green = Number(document.getElementById("state1").value);
    modelInit.NS_Left = Number(document.getElementById("state3").value);
    modelInit.EW_Green = Number(document.getElementById("state2").value);
    modelInit.EW_Left = Number(document.getElementById("state4").value);

    if (document.getElementById("allLanesOpen").checked) {
        // Do nothing
    } else if (document.getElementById("quarterClosure").checked) {
        modelInit.environmentModifer = 0.75;
    } else if (document.getElementById("halfClosure").checked) {
        modelInit.environmentModifer = 0.5;
    }

    if (document.getElementById("clearWeather").checked) {
        // Do nothing
    } else if (document.getElementById("rainyWeather").checked) {
        modelInit.timeToPeak = 25;
    } else if (document.getElementById("snowyWeather").checked) {
        modelInit.timeToPeak = 29;
    }

    return new TrafficModel(modelInit);
}
/**
 * Begins the global simulation time.
 */
function startSimulation() {
    window.lastDirection = 'ns_green';
    updateSim();
}

function updateSim(direction) {
    if(!verifyPercentages())
        alert("Percentages do not add up to 100 percent, please try again");
    else {
        if (document.getElementById("state1").value != null && document.getElementById("state1").value > 0 &&
            document.getElementById("state2").value != null && document.getElementById("state2").value > 0 &&
            document.getElementById("state3").value != null && document.getElementById("state3").value > 0 &&
            document.getElementById("state4").value != null && document.getElementById("state4").value > 0) {
            if(direction != null) {
                window.lastDirection = direction;
            }
            let trafficModel = getTrafficModelFromInputs();
            updateFlowAmounts(trafficModel);
            updateCharts(trafficModel, window.lastDirection);
        } else {
            alert("Error: Must supply cycle times");
        }
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






