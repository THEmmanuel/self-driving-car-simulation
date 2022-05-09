class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.accelaraion = 0.2;

		this.maxSpeed = 3;
		this.friction = 0.05;

		this.angle = 0;

		this.controls = new Controls()
	}

	update() {
		this.#Move()
	}

	#Move() {
		if (this.controls.forward) {
			this.speed += this.accelaraion;
		}
		if (this.controls.backward) {
			this.speed -= this.accelaraion;
		}
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed
		}
		//Reverse, negative here means reverse.
		if (this.speed < -this.maxSpeed / 2) {
			this.speed = -this.maxSpeed / 2;
		}

		// Friction increases and decreases based on speed
		if (this.speed > 0) {
			this.speed -= this.friction;
		}
		if (this.speed < 0) {
			this.speed += this.friction;
		}

		//Set the value of speed to 0 if it's less than the friction and has an absoliute value to stop the car completely
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		//Flip the inverted controls
		if (this.speed != 0) {
			const flip = this.speed > 0 ? 1 : -1;

			if (this.controls.left) {
				this.angle += 0.03 * flip
			}

			if (this.controls.right) {
				this.angle -= 0.03 * flip
			}

			this.x -= Math.sin(this.angle) * this.speed;
			this.y -= Math.cos(this.angle) * this.speed;
		}
	}

	draw(context) {
		context.save();
		context.translate(this.x, this.y)
		context.rotate(-this.angle)
		context.beginPath();
		context.rect(
			//Sets x to center
			-this.width / 2,
			-this.height / 2,
			this.width,
			this.height
		);
		context.fill();
		context.restore();
	}
}