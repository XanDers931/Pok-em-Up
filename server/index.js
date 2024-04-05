import { readFileSync } from 'node:fs';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import BaseValue from './modele/BaseValue.js';
import Background from './modele/Background.js';
import Player from './modele/Player.js';
import Ennemy from './modele/Ennemy.js';
/**
 * Manage and run the server.
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
 * Initialize game Constants.
 */
BaseValue.initialiseSimpleConstants(1920, 1080, 1000 / 60, 1000);
BaseValue.initialisePlayerConstants(48, 64, 0.5, 8, 10, 0.96);
BaseValue.initialiseBackgroundConstants(1);
BaseValue.initialiseEnnemyConstants(96, 96);

/**
 * Initialize game values.
 */
// let running;
let players;
let sockets;
let ennemies;
let background;

init();

/**
 * Start the server listeners.
 */
io.on('connection', socket => {
	console.log(`Nouvelle connexion du Joueur ${socket.id}`);
	//init();
	sockets.push(socket.id);
	players.push(new Player(socket.id));

	io.emit('newPlayer', players);

	socket.on('pseudo', pseudo => {
		getPlayerBySocket(socket.id).name = pseudo;
		io.emit('newPlayer', players);
	});

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
		io.emit('leftPlayer', socket.id);
		sockets = sockets.filter(socketId => socketId != socket.id);
		players = players.filter(player => player.socketId != socket.id);
	});

	socket.on('bg', state => {
		background.setState(state);
	});

	socket.on('keyDown', code => {
		getPlayerBySocket(socket.id).activeDirectionShot(code);
	});

	socket.on('keyUp', code => {
		getPlayerBySocket(socket.id).desactiveDirectionShot(code);
	});
});

/* a voir si ca ne pose pas de probleme d'exécuter tous les emit dans une seule methode sendData 
function sendBackgroundPosition() {
	io.emit('bgPosition', background.getPosition());
}
*/

/**
 * Function which send the datas to the clients.
 */
function sendData() {
	// a modifier creer un objet {bg: background.getPosition(), player: makePlayerPositionTable()} ...
	io.emit('bgPosition', background.getPosition());
	io.emit('playerPosition', makePlayerPositionTable());
	io.emit('projectilePosition', makeProjectilePositionTable());
	io.emit('ennemiesPosition', ennemies);
}

/**
 * Function that creates a table of all the position of the player.
 */
function makePlayerPositionTable() {
	let positions = [];
	sockets.forEach(socket => {
		positions.push([
			getPlayerBySocket(socket).getX(),
			getPlayerBySocket(socket).getY(),
		]);
	});
	return positions;
}

/*

*/

/**
 * Function that creates a table of all the projectiles for each player.
 */
function makeProjectilePositionTable() {
	let positions = [];
	sockets.forEach(socket => {
		positions.push(getPlayerBySocket(socket).projectiles);
	});
	return positions;
}

/**
 * Function that return the player having the socketId given.
 */
function getPlayerBySocket(socket) {
	let result;
	players.forEach(player => {
		if (player.socketId == socket) {
			result = player;
		}
	});
	return result;
}

function spawnEnnemy() {
	let ennemy = new Ennemy(3);
	ennemies.push(ennemy);
	io.emit('ennemySpawn', ennemy);
}

function recycleEnnemies() {
	ennemies.forEach(element => {
		if (element.isOutCanva()) {
			let index = ennemies.indexOf(element);
			ennemies.splice(index, 1);
			io.emit('ennemyRecycle', ennemies);
		}
	});
}

/**
 * Function to initialize the game and start the server sending datas to clients about the running game.
 */
function init() {
	// running = false;
	players = [];
	ennemies = [];
	sockets = [];
	background = new Background();
	setInterval(event => sendData(event), BaseValue.frameRate);
	setInterval(event => spawnEnnemy(event), BaseValue.spawnRate);
	setInterval(event => recycleEnnemies(event), BaseValue.frameRate);
}
