var Alert = function () {
	var container = document.querySelector('[data-alert-container]')

	var _init = function () {

	}

	var _create = function (type, message) {
		var toast = document.createElement('div')
		toast.classList.add('toast', 'align-items-center', 'text-white', 'bg-' + type, 'border-0', 'show')
		toast.setAttribute('role', 'alert')
		toast.setAttribute('aria-live', 'assertive')
		toast.setAttribute('aria-atomic', 'true')

		var flex = document.createElement('div')
		flex.classList.add('d-flex')

		var body = document.createElement('div')
		body.classList.add('toast-body')
		body.textContent = message

		var button = document.createElement('button')
		button.classList.add('btn-close', 'btn-close-white', 'me-2', 'm-auto')
		button.setAttribute('data-bs-dismiss', 'toast')
		button.setAttribute('aria-label', 'Close')

		flex.appendChild(body)
		flex.appendChild(button)
		toast.appendChild(flex)
		container.appendChild(toast)

		setTimeout(function () {
			toast.classList.remove('show')
		}, 3500)
	}

	return {
		register: function () {
			_init()
		},
		success: function (message) {
			_create('success', message)
		},
		danger: function (message) {
			_create('danger', message)
		}
	}
}()

window.addEventListener('DOMContentLoaded', function () {
	Alert.register()
})