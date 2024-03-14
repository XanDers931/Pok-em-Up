/**
 * Canvas
 */
const canvas = document.querySelector('.gameCanvas'),
	context = canvas.getContext('2d');

import { getCanvas } from './vue/draw.js';
getCanvas(canvas);

import View from './View.js';
import Router from './Router.js';

const gameView = new View(document.querySelector('.viewContent .game'));
const menuView = new View(document.querySelector('.viewContent .menu'));

const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
];

import { io } from 'socket.io-client';
const socket = io();

Router.routes = routes;
Router.navigate('/game');
Router.setMenuElement(document.querySelector('#menu')); // TODO ajouter dans le html la classe mainMenu a la liste des boutons du menu

/**
 *  Code
 */

import { Background } from './vue/inGame/background.js';
let bg = new Background(canvas.height, canvas.clientHeight);

import { Player } from './modele/inGame/player.js';
let p = new Player(canvas, 0, 0);

/**
 *  Render
 */

requestAnimationFrame(render);

console.log(canvas.width);

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (bg.getReady()) {
		bg.display();
	}
	if (p.getReady()) {
		p.display();
	}
	context.stroke();
	requestAnimationFrame(render);
}

/**
 * Canvas resize for each
 */
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
