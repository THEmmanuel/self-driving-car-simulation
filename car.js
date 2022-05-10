class Car {
	constructor(x, y, width, height, controlType, maxSpeed = 3) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.accelaraion = 0.2;

		this.maxSpeed = maxSpeed;
		this.friction = 0.05;

		this.angle = 0;
		this.damaged = false;

		this.sensor = new Sensor(this);
		this.controls = new Controls(controlType)
	}

	update(roadBorders) {
		if (!this.damaged) {
			this.#move();
			this.polygon = this.#createPolygon();
			this.damaged = this.#accessDamage(roadBorders);
		}
		this.sensor.update(roadBorders);
	}

	#accessDamage(roadBorders) {
		for (let index = 0; index < roadBorders.length; index++) {
			if (polygonIntersect(this.polygon, roadBorders[index])) {
				return true
			}
		}
		return false;
	}

	#createPolygon() {
		const points = [];
		const rad = Math.hypot(this.width, this.height) / 2;
		const alpha = Math.atan2(this.width, this.height);
		points.push({
			x: this.x - Math.sin(this.angle - alpha) * rad,
			y: this.y - Math.cos(this.angle - alpha) * rad
		});

		points.push({
			x: this.x - Math.sin(this.angle + alpha) * rad,
			y: this.y - Math.cos(this.angle + alpha) * rad
		});

		points.push({
			x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
		});

		points.push({
			x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
		});
		return points
	}

	#move() {
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
		if (this.damaged) {
			context.fillStyle = 'gray';
		} else {
			context.fillStyle = 'black'
		}


		context.beginPath();
		context.moveTo(this.polygon[0].x, this.polygon[0].y);
		for (let index = 1; index < this.polygon.length; index++) {
			context.lineTo(this.polygon[index].x, this.polygon[index].y)
		}
		context.fill();

		this.sensor.draw(context);
	}
}