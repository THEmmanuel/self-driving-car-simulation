class Road {
	constructor(x, width, laneCount = 3) {
		this.x = x;
		this.width = width;
		this.laneCount = laneCount;

		this.left = x - width / 2;
		this.right = x + width / 2;

		const infinity = 1000000000;
		this.top = -infinity;
		this.bottom = infinity;
	}

	draw(context) {
		context.lineWidth = 5;
		context.strokeStyle = 'white';

		for (let index = 0; index <= this.laneCount; index++) {
			const x = linearInterpolation(
				this.left,
				this.right,
				i / this.laneCount
			);
			context.beginPath();
			context.moveTo(this.left, this.top)
			context.lineTo(this.left, this.bottom);
			context.stroke();
		}
	}
}

const linearInterpolation = (A, B, t) => {
	return A + (B - A) * t;
}