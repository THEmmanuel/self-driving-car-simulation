const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 200;

const networkCanvas = document.getElementById('networkCanvas')
networkCanvas.width = 300;


//get drawing context
const carContext = carCanvas.getContext('2d');
const networkContext = networkCanvas.getContext('2d');

//get road
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
//get car
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'KEYS');
const traffic = [
	new Car(road.getLaneCenter(1), -100, 30, 50, 'NO_KEYS', 2)
];

const animate = () => {
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].update(road.borders, []);
	}
	car.update(road.borders, traffic);

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;

	carContext.save();

	carContext.translate(0, -car.y+carCanvas.height * 0.7);

	road.draw(carContext);
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].draw(carContext, 'red');
	}
	car.draw(carContext, 'blue');

	carContext.restore();

	Visualizer.drawNetwork(networkContext, car.brain);
	//Calls the animate 
	requestAnimationFrame(animate);
}

animate();