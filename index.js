const canvas = document.getElementById('mainCanvas')
canvas.width = 200;

//get drawing context
const context = canvas.getContext('2d');
//get car
const car = new Car(100, 100, 30, 50);
car.draw(context);

const animate = () => {
	car.update();
	canvas.height = window.innerHeight;
	car.draw(context)
	//Calls the animate 
	requestAnimationFrame(animate)
}

animate();

