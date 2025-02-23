const minutes = 25
let seconds = minutes * 60

let stateRun = false
let globalInterval

const timerDiv = document.getElementById('timer')

function start() {
	if (stateRun) {
		return console.log('function is work')
	} else {
		stateRun = true

		globalInterval = setInterval(() => {
			seconds--

			if (seconds < 300) {
				timerDiv.classList.add('fast')
			}

			if (seconds === 0) {
				clearInterval(globalInterval)
				seconds = minutes * 60
				stateRun = false

				return (timerDiv.textContent = '25:00')
			} else {
				return (timerDiv.textContent = `${
					Math.floor(seconds / 60) < 10
						? `0${Math.floor(seconds / 60)}`
						: Math.floor(seconds / 60)
				}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`)
			}
		}, 1000)
	}
}

function pause() {
	clearInterval(globalInterval)
	stateRun = false

	console.log('click pause', seconds)
}

function reset() {
	console.log('click reset')

	clearInterval(globalInterval)
	timerDiv.classList.remove('fast')
	seconds = minutes * 60
	stateRun = false

	return (timerDiv.textContent = `${
		Math.floor(seconds / 60) < 10
			? `0${Math.floor(seconds / 60)}`
			: Math.floor(seconds / 60)
	}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`)
}
