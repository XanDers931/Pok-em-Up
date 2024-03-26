import GameView from './vue/GameView.js';
import Router from './vue/Router.js';
import { io } from 'socket.io-client';
import MenuView from './vue/MenuView.js';

const gameView = new GameView(document.querySelector('.viewContent .game'));
const menuView = new MenuView(document.querySelector('.viewContent .menu'));

const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
];

const socket = io();

Router.routes = routes;
Router.navigate('/');
