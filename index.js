const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 200;

const networkCanvas = document.getElementById('networkCanvas')
networkCanvas.width = 300;

const generateCars = (n) => {
	const cars = [];
	for (let i = 1; i <= N; i++) {
		cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI'))
	}
	return cars;
}


//get drawing context
const carContext = carCanvas.getContext('2d');
const networkContext = networkCanvas.getContext('2d');

//get road
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
//get car
const N = 100;
const cars = generateCars(N)
const traffic = [
	new Car(road.getLaneCenter(1), -100, 30, 50, 'NO_KEYS', 2)
];

const animate = (time) => {
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].update(road.borders, []);
	}
	for (let i = 0; i < cars.length; i++) {
		cars[i].update(road.borders, traffic);

	}

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;

	carContext.save();

	carContext.translate(0, -cars[0].y + carCanvas.height * 0.7);

	road.draw(carContext);
	for (let index = 0; index < traffic.length; index++) {
		traffic[index].draw(carContext, 'red');
	}

	for (let i = 0; i < cars.length; i++) {
		cars[i].draw(carContext, 'blue');
	}

	carContext.restore();

	networkContext.lineDashOffset = -time / 50;

	Visualizer.drawNetwork(networkContext, cars[0].brain);
	//Calls the animate 
	requestAnimationFrame(animate);
}

animate();