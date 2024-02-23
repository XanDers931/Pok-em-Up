const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

const playerBorder = 10;

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
	context.stroke();
	requestAnimationFrame(render);
}

setInterval(movePlayer, 1000 / 60);

function movePlayer() {
	if (x > canvas.width - image.width - playerBorder) {
		x -= vitesse;
	}
	if (x < playerBorder) {
		x += vitesse;
	}
	if (y > canvas.height - image.height - playerBorder) {
		y -= vitesse;
	}
	if (y < playerBorder) {
		y += vitesse;
	}
	x += xDirection;
	y += yDirection;
}

function handleKeyboardStart(event) {
	if (event.key == 'ArrowLeft' || event.key == 'q') {
		xDirection = -vitesse;
	}
	if (event.key == 'ArrowRight' || event.key == 'd') {
		xDirection = vitesse;
	}
	if (event.key == 'ArrowDown' || event.key == 's') {
		yDirection = vitesse;
	}
	if (event.key == 'ArrowUp' || event.key == 'z') {
		yDirection = -vitesse;
	}
}

function handleKeyboardEnd(event) {
	if (event.key == 'ArrowLeft' || event.key == 'q') {
		xDirection = 0;
	}
	if (event.key == 'ArrowRight' || event.key == 'd') {
		xDirection = 0;
	}
	if (event.key == 'ArrowDown' || event.key == 's') {
		yDirection = 0;
	}
	if (event.key == 'ArrowUp' || event.key == 'z') {
		yDirection = 0;
	}
}

document.addEventListener('keydown', handleKeyboardStart);
document.addEventListener('keyup', handleKeyboardEnd);

/**
 * Canvas resize for each
 */
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
