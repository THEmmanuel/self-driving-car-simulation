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

	getLaneCenter(laneIndex) {
		const laneWidth = this.width / this.laneCount
		return this.left + laneWidth / 2 + laneIndex * laneWidth;
	}

	draw(context) {
		context.lineWidth = 5;
		context.strokeStyle = 'white';

		for (let index = 0; index <= this.laneCount; index++) {
			const x = linearInterpolation(
				this.left,
				this.right,
				index / this.laneCount
			);

			if (index > 0 && index < this.laneCount) {
				context.setLineDash([20, 20]);
			} else {
				context.setLineDash([])
			}

			context.beginPath();
			context.moveTo(x, this.top)
			context.lineTo(x, this.bottom);
			context.stroke();
		}
	}
}