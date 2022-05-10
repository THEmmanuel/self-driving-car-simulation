const canvas = document.getElementById('mainCanvas')
canvas.width = 200;

//get drawing context
const context = canvas.getContext('2d');
//get road
const road = new Road(canvas.width / 2, canvas.width * 0.9);
//get car
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS');
const traffic = [
	new Car(road.getLaneCenter(1), -100, 30, 50, 'NO_KEYS')
];

const animate = () => {
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].update(road.borders);
	}
	car.update(road.borders);

	canvas.height = window.innerHeight;
	context.save();

	context.translate(0, -car.y+canvas.height * 0.7);

	road.draw(context);
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].draw(context);
	}
	car.draw(context);

	context.restore();
	//Calls the animate 
	requestAnimationFrame(animate);
}

animate();