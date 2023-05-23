var assets = { bell: './assets/img/bell.png', bone: './assets/img/bone.png', chicken: './assets/img/chicken.png' }
var gameState = { WAITING: 'waiting', PLAYING: 'playing', LOSE: 'lose' }

var Game = function () {
	var state = gameState.WAITING
	var bonesAmount = document.getElementById('bone-amount').value
	var bonesArray = new Array()
	var chickens = Array.from({ length: 16 }, (x, i) => i)

	var betAmount = parseFloat(document.getElementById('bet-amount').value)
	var betButtonElement = document.querySelector('[data-bet-button]')
	var betCashoutElement = document.querySelector('[data-bet-cashout]')
	var cashoutElement = document.querySelector('[data-cashout]')
	var walletElement = document.querySelector('[data-wallet]')
	var totalWin = document.querySelector('[data-totalWin]')
	var bonesAmountElement = document.querySelector('[data-bones-amount]')
	var chickensAmountElement = document.querySelector('[data-chickens-amount]')
	var coefValueElement = document.querySelector('[data-info-coef]')

	var earned = 0
	var wallet = localStorage.getItem('wallet') || 500;

	var _listeners = function () {
		var betButtonElem = document.querySelector('[data-bet-button]')
		var boneInputElem = document.querySelector('input[id="bone-amount"]')
		var betInputElem = document.querySelector('input[id="bet-amount"]')

		walletElement.innerHTML = new Number(wallet).toFixed(2)

		betButtonElem.addEventListener('click', function (event) {
			event.preventDefault()

			if (betAmount >= wallet) return Alert.danger("Vous n'avez pas assez d'argent !")

			state = gameState.PLAYING

			betCashoutElement.classList.remove('d-none')
			betButtonElement.classList.add('d-none')

			_createBoard()
		})

		betCashoutElement.addEventListener('click', function (event) {
			event.preventDefault()

			if (state === gameState.LOSE) {
				location.reload()
				return
			}

			var cashed = (parseInt(earned) + parseInt(wallet))
			localStorage.setItem('wallet', cashed)
			walletElement.innerHTML = new Number(cashed).toFixed(2)

			var audio = new Audio('./assets/song/win.wav')
			audio.volume = 0.5
			audio.play()

			betCashoutElement.classList.add('d-none')
			betButtonElem.classList.remove('d-none')

			state = gameState.WAITING

			cashoutElement.innerHTML = new Number(0).toFixed(2)

			_createBoard()
		})

		boneInputElem.addEventListener('change', function (event) {
			event.preventDefault()

			bonesAmount = parseInt(this.value)

			bonesAmountElement.innerHTML = bonesAmount
			chickensAmountElement.innerHTML = (chickens.length - bonesAmount)
			coefValueElement.innerHTML = `x ${bonesAmount}`
		})

		betInputElem.addEventListener('change', function (event) {
			event.preventDefault()

			betAmount = parseFloat(this.value)
		})
	}

	var _generateBones = function (howMany) {
		while (bonesArray.length < howMany) {
			var rand = Math.floor(Math.random() * (chickens.length - 1) + 1)
			if (bonesArray.indexOf(rand) === -1) {
				bonesArray.push(rand)
			}
		}
	}

	// -- Permet de créer le jeu.
	var _createBoard = function () {
		var gameElement = document.querySelector('[data-game]')
		if (gameElement.childNodes.length === chickens.length) {
			while (gameElement.firstChild) {
				gameElement.removeChild(gameElement.firstChild)
			}
		}

		_generateBones(bonesAmount)

		for (var i = 1; i < chickens.length + 1; i++) {
			var element = document.createElement('div')
			var image = document.createElement('img')

			image.setAttribute('src', assets.bell)
			image.classList.add('w-75')
			element.setAttribute('data-id', i)
			element.classList.add('col-lg-3')

			element.appendChild(image)
			gameElement.appendChild(element)
		}

		_playable()
	}

	// -- Permet de rendre le jeu jouable.
	var _playable = function () {
		if (state !== gameState.PLAYING) return

		var elements = document.querySelectorAll('[data-id]')

		elements.forEach(function (element) {
			element.addEventListener('click', function (event) {
				if (state !== gameState.PLAYING) return

				var image = event.currentTarget.firstElementChild
				var element = event.currentTarget

				console.log(bonesArray);

				if (bonesArray.find(b => b == element.dataset.id)) {
					image.src = assets.bone
					var audio = new Audio('./assets/song/lose.wav')
					audio.volume = 0.5
					audio.play()

					_reveal(elements)
					state = gameState.LOSE
				} else {
					image.src = assets.chicken

					var restMultiple = (bonesAmount / 2)
					var earn = betAmount * restMultiple
					earned += earn

					cashoutElement.innerHTML = new Number(earned).toFixed(2)
					totalWin.innerHTML = new Number(earned).toFixed(2)
				}
			})
		})
	}

	// -- Permet de révélé tous les cloches.
	var _reveal = function (elements) {
		elements.forEach(function (element) {
			var image = element.firstElementChild

			if (bonesArray.find(b => b == element.dataset.id)) {
				image.src = assets.bone
			} else {
				image.src = assets.chicken
			}
		})
	}

	return {
		init: function () {
			_createBoard()
			_listeners()
		}
	}
}()

window.addEventListener('DOMContentLoaded', function () {
	Game.init()
})
