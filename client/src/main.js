import View from './vue/View.js';
import GameView from './vue/GameView.js';
import Router from './vue/Router.js';

const gameView = new GameView(document.querySelector('.viewContent .game'));
const menuView = new View(document.querySelector('.viewContent .menu'));

const routes = [
	{ path: '/', view: menuView },
	{ path: '/game', view: gameView },
];

import { io } from 'socket.io-client';
const socket = io();

Router.routes = routes;
Router.navigate('/');
Router.setMenuElement(document.querySelector('.menuButtons')); // TODO ajouter dans le html la classe mainMenu a la liste des boutons du menu
