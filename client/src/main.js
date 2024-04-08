import GameView from './vue/GameView.js';
import Router from './vue/Router.js';
import { io } from 'socket.io-client';
import MenuView from './vue/MenuView.js';
import EndView from './vue/EndView.js';
import PauseView from './vue/PauseView.js';
import CreditsView from './vue/CreditsView.js';
import ScoreBoardView from './vue/ScoreBoardView.js';

/**
 * Link the client to the server.
 */
const socket = io();

/**
 * Create our application views.
 */
const gameView = new GameView(
	document.querySelector('.viewContent .game'),
	socket
);
const menuView = new MenuView(document.querySelector('.viewContent .menu'));
const pauseView = new PauseView(
	document.querySelector('.viewContent .pause'),
	socket
);
const endView = new EndView(document.querySelector('.viewContent .end'));
const creditsView = new CreditsView(
	document.querySelector('.viewContent .credits')
);
const scoreBoardView = new ScoreBoardView(
	document.querySelector('.viewContent .scoreBoard'),
	socket
);

/**
 * Initialize the Router.
 */
const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
	{ path: '/scoreBoard', view: scoreBoardView },
	{ path: '/credits', view: creditsView },
	{ path: '/pause', view: pauseView },
	{ path: '/gameover', view: endView },
];
Router.routes = routes;

/**
 * Loading the first view of the application (the menu).
 */
Router.navigate('/');
