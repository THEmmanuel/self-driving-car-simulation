class Controls {
	constructor(type) {
		this.forward = false;
		this.left = false;
		this.right = false;
		this.backward = false;

		// # in front because this is a private method. Can't be accesed outside of this class.
		switch (type) {
			case 'KEYS':
				this.#addKeyboardListeners();
				break;

			case 'NO_KEYS':
				this.forward = true;
				break;
		}
	}

	#addKeyboardListeners() {
		document.onkeydown = event => {
			switch (event.key) {
				case 'ArrowLeft':
					this.left = true
					break;

				case 'ArrowRight':
					this.right = true
					break;

				case 'ArrowUp':
					this.forward = true
					break;

				case 'ArrowDown':
					this.backward = true
					break;
			}
		}

		document.onkeyup = event => {
			switch (event.key) {
				case 'ArrowLeft':
					this.left = false
					break;

				case 'ArrowRight':
					this.right = false
					break;

				case 'ArrowUp':
					this.forward = false
					break;

				case 'ArrowDown':
					this.backward = false
					break;
			}
		}
	}
}