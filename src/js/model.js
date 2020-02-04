/*
ModelInit Interface

straightFlow: number less than 1
rightFlow: number less than 1
leftFlow: number less than 1

environmentModifer: number, percentage modifer to traffic flow, defaults to 1.

reactionTime: number of seconds before drivers start moving, defaults to 2 seconds
peakFlow: the max flow for cars in any direction aka horizontal asymptote for acceleration function, defaults to 70 cars/sec
timeToPeak: number of seconds until acceleration inflection point. How long cars go before you see dithis.nishing returns from acceleration, defaults to 20 sec

X1: number, total rate of traffic for X1 input
X2: number, total rate of traffic for X2 input
X3: number, total rate of traffic for X3 input
X4: number, total rate of traffic for X4 input

NS_Green: number, seconds in north/south green state
NS_Left: number, seconds in north/south green state
EW_Green: number, seconds in north/south green state
EW_Left: number, seconds in north/south green state

stepSize: number, chart step size

private properties:
don't make these, they get calculated from the other inputs as interim values
NS_Rate: number greatest rate between X1 & X3
EW_Rate: number greates rate between X2 & X4

NS_Green_Start: number, time in seconds when NS_Green_State starts
NS_Green_End: number, time in seconds when NS_Green_State ends
NS_Left_Start: number, time in seconds when NS_Left_State starts
NS_Green_End: number, time in seconds when NS_Green_State ends
EW_Green_Start: number, time in seconds when EW_Green_State starts
EW_Green_End: number, time in seconds when EW_Green_State ends
EW_Left_Start: number, time in seconds when EW_Left_State starts
EW_Left_Ends: number, time in seconds when EW_Left_State ends

 */


class TrafficModel {
    constructor(MI) {
        if (typeof(MI.reactionTime) === 'undefined') {
            MI.reactionTime = 2;
        }
        if (typeof(MI.peakFlow) === 'undefined') {
            MI.peakFlow = 70;
        }
        if (typeof(MI.timeToPeak) === 'undefined') {
            MI.timeToPeak = 20;
        }
        if (typeof(MI.timeToPeak) === 'undefined') {
            MI.environmentModifer = 1;
        }
        if (typeof(MI.stepSize) === 'undefined') {
            MI.stepSize = 1; // 1 Second
        }

        this.NS_rate = MI.X1 > MI.X3 ? MI.X1 : MI.X3;
        this.EW_rate = MI.X2 > MI.X4 ? MI.X2 : MI.X4;
        
        this.reactionTime = MI.reactionTime;
        this.peakFlow = MI.peakFlow;
        this.timeToPeak = MI.timeToPeak;
        this.stepSize = MI.stepSize;
        
        this.X1 = MI.X1;
        this.X2 = MI.X2;
        this.X3 = MI.X3;
        this.X4 = MI.X4;
        
        this.NS_Green = MI.NS_Green;
        this.NS_Left = MI.NS_Left;
        this.EW_Green = MI.EW_Green;
        this.EW_Left = MI.EW_Left;
        
        this.straightFlow = MI.straightFlow;
        this.rightFlow = MI.rightFlow;
        this.leftFlow = MI.leftFlow;
        this.greenFlow = this.straightFlow > this.rightFlow ? this.straightFlow : this.rightFlow;
        
        this.environmentModifer = MI.environmentModifer;


        this.NS_Left_Start = 0;
        this.NS_Left_End =  this.NS_Left_Start + this.NS_Left;
        this.NS_Green_Start = this.NS_Left_End;
        this.NS_Green_End = this.NS_Green_Start + this.NS_Green
        this.EW_Left_Start = this.NS_Green_End;
        this.EW_Left_End = this.EW_Left_Start + this.EW_Left;
        this.EW_Green_Start = this.EW_Left_End;
        this.EW_Green_End = this.EW_Green_Start + this.EW_Green;

    }

    getAccelAtTime(time) {
        if(time < this.reactionTime) {
            return 0;
        }
        return  2 * this.peakFlow / Math.PI * Math.atan(Math.PI * (time - this.reactionTime) / this.timeToPeak)
    }


// time in seconds
    getAccelIntegralAtTime(time) {
        return this.peakFlow * (2 * Math.PI * time * Math.atan(Math.PI * time / this.timeToPeak) - (this.timeToPeak * Math.log(Math.pow(Math.PI, 2) * Math.pow(time, 2) + Math.pow(this.timeToPeak, 2)))) / Math.pow(Math.PI, 2);
    }
// time in seconds, this is the top of our integral
    getTotalCarOnGreenCycle(time) {
        if (time < this.reactionTime) {
            return 0;
        }
        time = time - this.reactionTime;

        console.log(this.getAccelIntegralAtTime(time));
        console.log(this.getAccelIntegralAtTime(0));
        // Integral is from a to b is integral(b) - integral(a). In our case it always starts at 0 to our elapsed time
        return this.environmentModifer * (this.getAccelIntegralAtTime(time) - this.getAccelIntegralAtTime(0));

    }
    

// Input flow X1R, (rate of cars per this.n after being reduced by turn choice)
    isDirectionValid(inputFlow, totalCycleTime, lightCycleTime) {
        return inputFlow * totalCycleTime <= this.getTotalCarOnGreenCycle(lightCycleTime);
    }

// Returns object which shows directions that passed
    verify() {
        let verification = {};
        let totalCycleTime = this.getTotalCycleTime();
        verification.NS_Green = this.isDirectionValid(this.NS_rate * (this.straightFlow > this.rightFlow ? this.straightFlow : this.rightFlow), totalCycleTime, this.NS_Green);
        verification.NS_Left = this.isDirectionValid(this.NS_rate * this.leftFlow, totalCycleTime, this.NS_Left);
        verification.EW_Green = this.isDirectionValid(this.EW_rate * (this.straightFlow > this.rightFlow ? this.straightFlow : this.rightFlow), totalCycleTime, this.EW_Green);
        verification.EW_Left = this.isDirectionValid(this.EW_rate * this.leftFlow, totalCycleTime, this.EW_Left);
        return verification;
    }


    getAccelDataForSelection(state) {

        let data = [];
        for(let j = 0; j < this.NS_Left; j = j += this.stepSize) {
            if(j < this.reactionTime) {
                data.push(0);
            } else {
                data.push(this.getAccelAtTime(j - this.reactionTime));
            }
        }


    }

// Must be an int
    getTotalCycleTime() {
        return this.NS_Green + this.NS_Left + this.EW_Green + this.EW_Left;
    }
}
