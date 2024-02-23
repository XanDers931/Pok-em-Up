console.log('Salut, can vas ? 🫠');
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

let drawing = false;
let save = [[]];
function drawToTheClick(event) {
	if (drawing) {
		save.push([event.offsetX, event.offsetY]);
		//context.lineTo(event.offsetX, event.offsetY);
		//context.stroke();
	}
}

canvas.addEventListener('mousedown', () => {
	drawing = true;
	context.beginPath();
});
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mousemove', drawToTheClick);

/*
context.strokeRect(275, 175, 50, 50);
context.arc(300, 200, 25, 0, 360);
context.stroke();
*/

/*
context.beginPath();
context.lineWidth = 0;
context.fillStyle = 'green';
context.rect(100, 50, 100, 100);
context.stroke();
context.fill();
context.beginPath();
context.lineWidth = 4;
context.fillStyle = 'blue';
context.strokeStyle = 'purple';
context.arc(400, 100, 50, 0, 360);
context.stroke();
context.fill();
*/

let x = 0;
let y = 0;
let xDirection = 0;
let yDirection = 0;
const vitesse = 5;

const image = new Image();
image.src = '/images/monster.png';
image.addEventListener('load', event => {
	requestAnimationFrame(render);
});

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, x, y);
	save.forEach(element => context.lineTo(element[0], element[1]));
	context.stroke();
	requestAnimationFrame(render);
}
/*
function moveMonster() {
	if (x > canvas.width - image.width) {
		xDirection = -xDirection;
	}
	if (x < 0) {
		xDirection = -xDirection;
	}
	if (y > canvas.height - image.height) {
		yDirection = -yDirection;
	}
	if (y < 0) {
		yDirection = -yDirection;
	}

	x += xDirection;
	y += yDirection;
}
*/

setInterval(moveMonster, 1000 / 60);

function moveMonster() {
	if (x > canvas.width - image.width - 1) {
		x -= vitesse;
	}
	if (x < 0 + 1) {
		x += vitesse;
	}
	if (y > canvas.height - image.height - 1) {
		y -= vitesse;
	}
	if (y < 0 + 1) {
		y += vitesse;
	}

	x += xDirection;
	y += yDirection;
}

function handleKeyboardStart(event) {
	if (event.key == 'ArrowLeft') {
		xDirection = -vitesse;
	}
	if (event.key == 'ArrowRight') {
		xDirection = vitesse;
	}
	if (event.key == 'ArrowDown') {
		yDirection = vitesse;
	}
	if (event.key == 'ArrowUp') {
		yDirection = -vitesse;
	}
}

function handleKeyboardEnd(event) {
	if (event.key == 'ArrowLeft') {
		xDirection = 0;
	}
	if (event.key == 'ArrowRight') {
		xDirection = 0;
	}
	if (event.key == 'ArrowDown') {
		yDirection = 0;
	}
	if (event.key == 'ArrowUp') {
		yDirection = 0;
	}
}

document.addEventListener('keydown', handleKeyboardStart);
document.addEventListener('keyup', handleKeyboardEnd);

const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
