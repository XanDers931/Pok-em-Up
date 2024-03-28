import http from 'http';
import express from 'express';
import { readFileSync } from 'node:fs';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
import Player from './Player.js';
import Background from './Background.js';
import BaseValue from './BaseValue.js';

BaseValue.initialiseSimpleValue(1920, 1080, 1000 / 60, 1);
BaseValue.initialisePlayer(96, 128, 0.5, 8, 10, 0.96);

const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = http.createServer(app);
const fileOptions = { root: process.cwd() };

let running;
let players = new Map();
let sockets = [];
let ennemies;
let background;

const io = new IOServer(httpServer);
io.on('connection', socket => {
	console.log(`Nouvelle connexion du Joueur ${socket.id}`);
	init();
	sockets.push(socket.id);
	players.set(socket.id, new Player());

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
	});

	socket.on('bg', state => {
		console.log(state);
		background.setState(state);
	});

	socket.on('keyDown', com => {
		console.log(com);
		players.get(socket.id).handleKeyboardStart(com);
	});

	socket.on('keyUp', com => {
		players.get(socket.id).handleKeyboardEnd(com);
	});

	//io.emit('news', { langue: 'fr' });
});

addWebpackMiddleware(app);

app.use(express.static('client/public'));

httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

/*
function sendBackgroundPosition() {
	io.emit('bgPosition', background.getPosition());
}
*/

function sendData() {
	io.emit('bgPosition', background.getPosition());
	io.emit('playerPosition', [
		players.get(sockets[0]).getX(),
		players.get(sockets[0]).getY(),
	]);
}

function init() {
	running = false;
	//players = new Map();
	ennemies = [];
	background = new Background();
	setInterval(sendData, 1000 / 120);
}
