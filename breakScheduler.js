//globals
var workInterval; //min
var breakInterval; //min
var repetitions;
var total; //seconds

//timer vars, added to clear when needed
var breakTimeout;
var workTimeout;
var timerInterval;

function updateTimer() {
    //todo: setInterval is inaccurate, use date obj for countdown
    const clock = document.getElementById("clockdiv");
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
    if (total > 0) {
        //console.log("total:"+ total);
        var hours = Math.floor(total / 3600);
        var minutes = Math.floor((total - hours * 3600)/60);
        var seconds = Math.floor(total - hours * 3600 - minutes * 60);
        --total;
        hoursSpan.innerHTML = ('0' + hours).slice(-2);
        minutesSpan.innerHTML = ('0' + minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + seconds).slice(-2);   
    } else {
        hoursSpan.innerHTML = '00';
        minutesSpan.innerHTML = '00';
        secondsSpan.innerHTML = '00'; 
    }
}

function clearTimer() {
    clearInterval(timerInterval);
    const clock = document.getElementById("clockdiv");
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
    hoursSpan.innerHTML = '00';
    minutesSpan.innerHTML = '00';
    secondsSpan.innerHTML = '00'; 
}

// work: bool
// time: in minutes
function startTimer(work, time) {
    clearTimer();
    if (work) {
        // todo set color red
        document.getElementById("clockMessage").innerHTML = "Get to Work!";
    } else { // break
        // todo set color blue
        document.getElementById("clockMessage").innerHTML = "Step away from the desk!";
    }
    total = Math.floor(time * 60); //seconds
    //console.log("time started: "+total);
    timerInterval = setInterval(updateTimer, 1000);   
}

function playAudio() {
    var ele = document.getElementsByName("soundOpt");    
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked && ele[i].value != "silent") {
            document.getElementById(ele[i].value).play();
            //console.log(ele[i].value);
            break;
        }      
    }   
}

function startWork() {
    clearTimer();
    playAudio();
    --repetitions;
    if (repetitions > 0) {
        workTimeout = setTimeout(startBreak, workInterval * 1000 * 60);
        startTimer(true, workInterval);
    }
    else {
        document.getElementById("alertHome").style.display = "";
        document.getElementById("divTimer").style.display = "none";
    }
}

function startBreak() {
    clearTimer();
    playAudio();
    breakTimeout = setTimeout(startWork, (breakInterval * 1000 * 60));
    startTimer(false, breakInterval);
}

function start() {
    workInterval = document.getElementById("workInterval").value;
    breakInterval = document.getElementById("breakInterval").value;
    repetitions = document.getElementById("repetitions").value;

    if (workInterval == "" ||
        breakInterval == "" ||
        repetitions == "") {
            // todo: display toast/form error?
    } else if (workInterval >= 0 &&
               breakInterval >= 0 &&
               repetitions >= 0) {
        document.getElementById("divForm").style.display = "none";
        document.getElementById("divTimer").style.display = "";
        workTimeout = setTimeout(startBreak, (workInterval * 1000 * 60));
        startTimer(true, workInterval);
    }   
}
