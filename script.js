const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var time = [0,0,0,0];
var interval;
var beginTime = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function AddZeroAtFirst(time) {
	if (time <= 9)
		time = "0" + time;
	return time;
}

// Run a standard minute/second/hundredths timer:
function RunningTime() {
	var currentTime = AddZeroAtFirst(time[0]) + ":" + AddZeroAtFirst(time[1]) + ":" + AddZeroAtFirst(time[2]);
	theTimer.innerHTML = currentTime;
	time[3]++;
	time[0] = Math.floor((time[3] / 100) / 60);
	time[1] = Math.floor((time[3] / 100) - (time[0] * 60));
	time[2] = Math.floor(time[3] - (time[1] * 100) - (time[0] * 6000));
}

// Match the text entered with the provided text on the page:
function Check(){
	var textInput = testArea.value;
	var originTextMatch = originText.substr(0, textInput.length);

	if (textInput == originText){
		clearInterval(interval);
		testWrapper.style.borderColor = "green";
	}
	else{
		if (textInput == originTextMatch)
			testWrapper.style.borderColor = "#87F3A8";
		else
			testWrapper.style.borderColor = "red";
	}
}

// Start the timer:
function Start() {
	var textInputLength = testArea.value.length;
	if (textInputLength == 0 && !beginTime){
		beginTime = true;
		interval = setInterval(RunningTime, 10);
	}
}

// Reset everything:
function Reset() {
	clearInterval(interval);
	interval = null;
	time = [0,0,0,0];
	beginTime = false;
	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keydown", Start);
testArea.addEventListener("keyup", Check);
resetButton.addEventListener("click", Reset, false);
