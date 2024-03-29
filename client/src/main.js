import GameView from './vue/GameView.js';
import Router from './vue/Router.js';
import { io } from 'socket.io-client';
import MenuView from './vue/MenuView.js';

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

/**
 * Initialize the Router.
 */
const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
];
Router.routes = routes;

/**
 * Loading the first view of the application (the menu).
 */
Router.navigate('/');
