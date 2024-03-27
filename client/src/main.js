import GameView from './vue/GameView.js';
import Router from './vue/Router.js';
import { io } from 'socket.io-client';
import MenuView from './vue/MenuView.js';
import EndView from './vue/EndView.js';

const socket = io();
const gameView = new GameView(
	document.querySelector('.viewContent .game'),
	socket
);
const menuView = new MenuView(document.querySelector('.viewContent .menu'));
const endView = new EndView(document.querySelector('.viewContent .end'));

const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
	{ path: '/gameover', view: endView },
];

Router.routes = routes;
Router.navigate('/');

socket.on('news', data => {
	console.log(data);
});
