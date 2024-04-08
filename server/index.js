import { Server as IOServer } from 'socket.io';
import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import BaseValue from './modele/BaseValue.js';
import Background from './modele/Background.js';
import Player from './modele/Player.js';
import Ennemy from './modele/Ennemy.js';
import Bonus from './modele/Bonus.js';
import ScoreData from './modele/ScoreData.js';
import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';

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
BaseValue.initialiseBonusConstants(48, 16, 1000 / 6, 5, 2);
BaseValue.initialiseSkinIdList([1, 4, 7, 152, 155, 158]);
BaseValue.initialiseEnnemyConstants(30, 10);

/**
 * Initialize game values.
 */
let players;
let skinId;
let skinIdList;
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

	sockets.push(socket.id);
	skinId = giveRandomSkinId();
	players.push(new Player(socket.id, skinId));

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

		skinIdList = skinIdList.filter(
			id => id != players.find(player => player.socketId == socket.id).skinId
		);
		players = players.filter(player => player.socketId != socket.id);

		if (players.length < 1) {
			restart();
		}
	});

	socket.on('restartGame', () => {
		//if ((players.length = 1)) {
		restart();
		//}
	});

	socket.on('showScoreBoard', () => {
		const scoresData = [];
		const json = JSON.parse(readFileSync('./server/scores.json'));
		json.forEach(element => {
			scoresData.push(new ScoreData(element.name, element.score));
		});
		socket.emit('sendScoresData', scoresData);
	});

	socket.on('addScore', score => {
		const scoresData = [];
		const read = readFileSync('./server/scores.json');
		if (read.length >= 1) {
			const json = JSON.parse(read);
			json.forEach(element => {
				scoresData.push(new ScoreData(element.name, element.score));
			});
			scoresData.push(new ScoreData(getPlayerBySocket(socket.id).name, score));

			writeFileSync('./server/scores.json', JSON.stringify(scoresData));
		} else {
			writeFileSync(
				'./server/scores.json',
				JSON.stringify([
					{
						name: getPlayerBySocket(socket.id).name,
						score: score,
					},
				])
			);
		}
	});

	socket.emit('getUserName', getPlayerBySocket(socket.id).name);

	socket.on('game', state => {
		background.setState(state);
		players.forEach(player => {
			player.setState(state);
			player.projectiles.forEach(projectile => {
				projectile.setState(state);
			});
		});
		ennemies.forEach(ennemy => {
			ennemy.setState(state);
		});
		bonus.forEach(element => {
			element.setState(state);
		});
		running = state;
	});
	//players.filter(player => player.socketId != socket.id);
	socket.on('keyDown', code => {
		players
			.find(player => player.socketId == socket.id)
			.activeDirectionShot(code);
	});
	//

	socket.on('keyUp', code => {
		players
			.find(player => player.socketId == socket.id)
			.desactiveDirectionShot(code);
	});
});

/**
 * Function to give an id randomized from a list
 */
function giveRandomSkinId() {
	const initialList = BaseValue.skinIdlist;
	if (skinIdList.length == 6) {
		return 0;
	} else {
		const difference = initialList.filter(
			element => !skinIdList.includes(element)
		);
		const id = difference[Math.floor(Math.random() * difference.length)];
		skinIdList.push(id);
		return id;
	}
}

/**
 * Function to restart the game.
 */
function restart() {
	running = false;
	//background = new Background(); à voir
	players = [];
	ennemies = [];
	bonus = [];
	// + voir pour la musique
	io.emit('restart', null);
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
	players.forEach(player => {
		positions.push([player.getX(), player.getY()]);
	});
	return positions;
}

/**
 * Function that creates a table of all the projectiles for each player.
 */
function makeProjectilePositionTable() {
	let positions = [];
	players.forEach(player => {
		positions.push(player.projectiles);
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
 * Function to check if a player collide with an ennemy
 */
function ennemyKillPlayer() {
	if (running == true) {
		players.forEach(player => {
			ennemies.forEach(ennemy => {
				if (
					ennemy.collideWithPlayer(
						player.getX(),
						player.getY(),
						BaseValue.playerWidth,
						BaseValue.playerHeight,
						ennemy.getX(),
						ennemy.getY(),
						BaseValue.ennemyWidth,
						BaseValue.ennemyHeight
					)
				) {
					let index = ennemies.indexOf(ennemy);
					ennemies.splice(index, 1);
					io.emit('ennemyKillPlayer', ennemy);
					io.emit('reduceLife', player);
					player.x = -100;
					player.y = -100;
					player.setState(false);
				}
			});
		});
	}
}

function playerTakeBonus() {
	if (running == true) {
		players.forEach(player => {
			bonus.forEach(plus => {
				if (
					plus.collideWithPlayer(
						player.getX(),
						player.getY(),
						BaseValue.playerWidth,
						BaseValue.playerHeight,
						plus.getX(),
						plus.getY(),
						BaseValue.bonusWidth,
						BaseValue.bonusHeight
					)
				) {
					const index = bonus.indexOf(plus);
					bonus.splice(index, 1);
					io.emit('bonusTaken', plus);
					player.useBonusEffect();
				}
			});
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
	skinId = 0;
	ennemies = [];
	bonus = [];
	skinIdList = [];

	setInterval(event => sendData(event), BaseValue.frameRate);
	setInterval(event => spawnEnnemy(event), BaseValue.spawnRate);
	setInterval(event => recycleEnnemies(event), BaseValue.frameRate);
	setInterval(event => spawnBonus(event), 2000);
	setInterval(event => ennemyKillPlayer(event), BaseValue.frameRate);
	setInterval(event => playerTakeBonus(event), BaseValue.frameRate);
}
