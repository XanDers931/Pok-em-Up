import { readFileSync } from 'node:fs';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import BaseValue from './modele/BaseValue.js';
import Background from './modele/Background.js';
import Player from './modele/Player.js';

/**
 * Manage and run the server
 */
const PORT = process.env.PORT || 8000;
const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
//const fileOptions = { root: process.cwd() };

addWebpackMiddleware(app);
app.use(express.static('client/public'));
httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

/**
 * Initialize game Constants
 */
BaseValue.initialiseSimpleConstants(1920, 1080, 1000 / 60, 1);
BaseValue.initialisePlayerConstants(96, 128, 0.5, 8, 10, 0.96);
BaseValue.initialiseBackgroundConstants(1);

/**
 * Initialize game values
 */
// let running;
let players;
let sockets;
let ennemies;
let background;

/**
 * Start the server listeners
 */
io.on('connection', socket => {
	console.log(`Nouvelle connexion du Joueur ${socket.id}`);
	init();
	sockets.push(socket.id);
	players.set(socket.id, new Player());

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
	});

	socket.on('bg', state => {
		background.setState(state);
	});

	socket.on('keyDown', code => {
		players.get(socket.id).activeDirection(code);
	});

	socket.on('keyUp', code => {
		players.get(socket.id).desactiveDirection(code);
	});
});

/* a voir si ca ne pose pas de probleme d'exécuter tous les emit dans une seule methode sendData 
function sendBackgroundPosition() {
	io.emit('bgPosition', background.getPosition());
}
*/

/**
 * Function which send the datas to the clients
 */
function sendData() {
	io.emit('bgPosition', background.getPosition());
	io.emit('playerPosition', [
		players.get(sockets[0]).getX(),
		players.get(sockets[0]).getY(),
	]);
}

/**
 * Function to initialize the game and start the server sending datas to clients about the running game
 */
function init() {
	// running = false;
	players = new Map();
	ennemies = [];
	sockets = [];
	background = new Background();
	setInterval(sendData, 1000 / 60);
}
