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

		this.controls = new Controls()
	}

	update() {
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

		if (this.controls.left) {
			this.x -= 2
		}

		if (this.controls.right) {
			this.x += 2
		}

		this.y -= this.speed
	}

	draw(context) {
		context.beginPath();
		context.rect(
			//Sets x to center
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);
		context.fill();
	}
}