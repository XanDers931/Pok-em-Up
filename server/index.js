import http from 'http';
import express from 'express';
import { readFileSync } from 'node:fs';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';

const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = http.createServer(app);
const fileOptions = { root: process.cwd() };

const io = new IOServer(httpServer);
io.on('connection', socket => {
	console.log(`Nouvelle connexion du Joueur ${socket.id}`);

	socket.on('disconnect', () => {
		console.log(`Déconnexion du Joueur ${socket.id}`);
	});
});

addWebpackMiddleware(app);

app.use(express.static('client/public'));

/*
app.get('/api/episodes', (req, res) => {
	const content = [];
	JSON.parse(readFileSync('episodes.json', { encoding: 'utf8' })).forEach(
		element => {
			content.push({
				id: element.id,
				episode: element.episode,
				name: element.name,
			});
		}
	);
	res.end(JSON.stringify(content));
});

app.get('/api/episodes/:episodeId', (req, res) => {
	let content;
	content = JSON.parse(
		readFileSync('episodes.json', { encoding: 'utf8' })
	).find(element => element.id == req.params.episodeId);
	res.end(JSON.stringify(content));
});

*/

httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
