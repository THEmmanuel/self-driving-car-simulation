const canvas = document.getElementById('mainCanvas')
canvas.width = 200;

//get drawing context
const context = canvas.getContext('2d');
//get road
const road = new Road(canvas.width / 2, canvas.width * 0.9);
//get car
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

const animate = () => {
	car.update();
	canvas.height = window.innerHeight;
	road.draw(context);
	car.draw(context)
	//Calls the animate 
	requestAnimationFrame(animate)
}

animate();