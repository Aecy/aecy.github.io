window.addEventListener('DOMContentLoaded', function () {
	var sec = 0
	var min = 0
	var hr = 0
	var countdownElement = document.querySelector('span[data-countdown]')

	function timer() {
		sec = parseInt(sec);
		min = parseInt(min);
		hr = parseInt(hr);

		sec = sec + 1;

		if (sec == 60) {
			min = min + 1;
			sec = 0;
		}
		if (min == 60) {
			hr = hr + 1;
			min = 0;
			sec = 0;
		}

		if (sec < 10 || sec == 0) {
			sec = '0' + sec;
		}
		if (min < 10 || min == 0) {
			min = '0' + min;
		}
		if (hr < 10 || hr == 0) {
			hr = '0' + hr;
		}

		countdownElement.innerHTML = `${hr}:${min}:${sec}`;
	}

	setInterval(timer, 1000)
})