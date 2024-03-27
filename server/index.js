import http from 'http';
import express from 'express';
import { readFileSync } from 'node:fs';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
//import Player from './Player.js';
import Background from './Background.js';

const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = http.createServer(app);
const fileOptions = { root: process.cwd() };

let running;
let players;
let ennemies;
let background;

const io = new IOServer(httpServer);
io.on('connection', socket => {
	console.log(`Nouvelle connexion du Joueur ${socket.id}`);
	init();
	//players.set(socket.id, new Player());

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
	});

	socket.on('bg', state => {
		console.log(state);
		background.setState(state);
	});

	//io.emit('news', { langue: 'fr' });
});

addWebpackMiddleware(app);

app.use(express.static('client/public'));

httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

function sendBackgroundPosition() {
	io.emit('bgPosition', background.getPosition());
}

function init() {
	running = false;
	//players = new Map();
	ennemies = [];
	background = new Background();
	setInterval(sendBackgroundPosition, 1000 / 120);
}
