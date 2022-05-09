class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.controls = new Controls()
	}

	draw (context) {
		context.beginPath();
		context.rect(
			//Sets x to center
			this.x - this.width/2,
			this.y - this.height/2,
			this.width,
			this.height
		);
		context.fill();
	}
}