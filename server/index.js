import { readFileSync } from 'node:fs';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import BaseValue from './modele/BaseValue.js';
import Background from './modele/Background.js';
import Player from './modele/Player.js';
import Ennemy from './modele/Ennemy.js';
import Bonus from './modele/Bonus.js';

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
BaseValue.initialiseSimpleConstants(1920, 1080, 1000 / 60, 1500);
BaseValue.initialisePlayerConstants(48, 64, 0.5, 8, 10, 0.96);
BaseValue.initialiseBackgroundConstants(1);
BaseValue.initialiseEnnemyConstants(96, 96);
BaseValue.initialiseBonusConstants(64, 64, 1000 / 6, 8);

/**
 * Initialize game values.
 */
// let running;
let players;
let sockets;
let ennemies;
let background;
let bonus;
let running;

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
	socket.emit('initEnnemies', ennemies);

	socket.on('pseudo', pseudo => {
		getPlayerBySocket(socket.id).name = pseudo;
		io.emit('newPlayer', players);
	});

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
		io.emit('leftPlayer', socket.id);
		sockets = sockets.filter(socketId => socketId != socket.id);
		players = players.filter(player => player.socketId != socket.id);
		if (players.length < 1) {
			restart();
		}
	});

	socket.on('game', state => {
		background.setState(state);
		running = state;
	});

	socket.on('keyDown', code => {
		getPlayerBySocket(socket.id).activeDirectionShot(code);
	});

	socket.on('keyUp', code => {
		getPlayerBySocket(socket.id).desactiveDirectionShot(code);
	});
});

/**
 * Fonction pour redémarrez une partie.
 */
function restart() {
	bonus = [];
	ennemies = [];
	running = false;
}

/**
 * Function which send the datas to the clients.
 */
function sendData() {
	let data = {
		bg: background.getPosition(),
		players: makePlayerPositionTable(),
		projectiles: makeProjectilePositionTable(),
		ennemies: ennemies,
		bonus: bonus,
	};
	io.emit('updatePositions', data);
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

/**
 * Function to spawn an ennemy.
 */
function spawnEnnemy() {
	if (running == true) {
		let ennemy = new Ennemy(3);
		ennemies.push(ennemy);
		io.emit('ennemySpawn', ennemy);
	}
}

/**
 * Function to delete useless ennemies.
 */
function recycleEnnemies() {
	if (running == true) {
		ennemies.forEach(element => {
			if (element.isOutCanva()) {
				let index = ennemies.indexOf(element);
				ennemies.splice(index, 1);
				io.emit('ennemyRecycle', ennemies);
			}
		});
	}
}

/**
 * Function to spawn a bonus.
 */
function spawnBonus() {
	if (running == true) {
		bonus.push(new Bonus());
		io.emit('newBonus', bonus);
		bonus.forEach(element => {
			if (element.x < 0 - BaseValue.bonusWidth) {
				let index = bonus.indexOf(element);
				bonus.splice(index, 1);
			}
		});
	}
}

/**
 * Function to initialize the game and start the server sending datas to clients about the running game.
 */
function init() {
	running = false;
	sockets = [];
	background = new Background();
	players = [];
	ennemies = [];
	bonus = [];

	setInterval(event => sendData(event), BaseValue.frameRate);
	setInterval(event => spawnEnnemy(event), BaseValue.spawnRate);
	setInterval(event => recycleEnnemies(event), BaseValue.frameRate);
	setInterval(event => spawnBonus(event), 2000);
}
