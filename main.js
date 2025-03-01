const MINUTES = 1
const INITIAL_SECONDS = MINUTES * 60
let seconds = INITIAL_SECONDS

let isRunning = false
let globalInterval

const timerDiv = document.getElementById('timer')

const formatTime = time => {
	return `${Math.floor(time / 60)
		.toString()
		.padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
}

function start() {
	if (isRunning) return

	isRunning = true

	globalInterval = setInterval(() => {
		seconds--

		if (seconds < 300) {
			timerDiv.classList.add('fast')
		}

		if (seconds === 0) {
			clearInterval(globalInterval)
			seconds = INITIAL_SECONDS
			isRunning = false

			timerDiv.textContent = formatTime(seconds)
			return
		}

		timerDiv.textContent = formatTime(seconds)
	}, 1000)
}

function pause() {
	clearInterval(globalInterval)
	isRunning = false
}

function reset() {
	clearInterval(globalInterval)
	timerDiv.classList.remove('fast')
	seconds = INITIAL_SECONDS
	isRunning = false

	timerDiv.textContent = formatTime(seconds)
}

// Request Animation Frame

const INITIAL_MILLISECONDS = INITIAL_SECONDS * 1000
let milliseconds = INITIAL_MILLISECONDS
let startTime
let endTime

let isStarting = false

const animationTimerDiv = document.getElementById('animationTimer')

const formatedTime = time => {
	return `${Math.floor(time / 60000)
		.toString()
		.padStart(2, '0')}:${Math.floor((time % 60000) / 1000)
		.toString()
		.padStart(2, '0')}`
}

const updateTime = () => {
	if (isStarting) {
		let currentTime = performance.now()
		milliseconds = endTime - currentTime

		animationTimerDiv.textContent = formatedTime(milliseconds)

		if (milliseconds < 300000) {
			animationTimerDiv.classList.add('fast')
		}

		if (endTime > currentTime) {
			requestAnimationFrame(updateTime)
		} else {
			isStarting = false
			animationTimerDiv.classList.remove('fast')
			animationTimerDiv.textContent = formatedTime(INITIAL_MILLISECONDS)
			return
		}
	}
}

function frameStart() {
	if (isStarting) return

	isStarting = true

	startTime = performance.now()
	endTime = startTime + milliseconds

	requestAnimationFrame(updateTime)
}

function framePause() {
	isStarting = false
}

function frameReset() {
	isStarting = false
	animationTimerDiv.classList.remove('fast')
	animationTimerDiv.textContent = formatedTime(INITIAL_MILLISECONDS)
	milliseconds = INITIAL_MILLISECONDS
}
