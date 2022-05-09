class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.accelaraion = 0.2;

		this.controls = new Controls()
	}

	update(){
		if (this.controls.forward) {
			this.speed += this.accelaraion;
		}
		if (this.controls.backward) {
			this.speed -= this.accelaraion;
		}
		this.y -= this.speed
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