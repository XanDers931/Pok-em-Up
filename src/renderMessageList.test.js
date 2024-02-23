import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderMessage } from './renderMessageList.js';
/**
 * Permet de nettoyer une chaîne HTML des tabulations et retours à la ligne
 * afin de comparer plus facilement l'égalité de deux chaînes.
 * @param htmlString la chaîne HTML à nettoyer
 * @return la chaîne nettoyée
 */
function sanitizeHtml(htmlString) {
	return htmlString.replaceAll(/[\n|\t]/g, '');
}

describe('renderMessage', () => {
	it('should return the right html markup when isCurrentAuthor is true', () => {
		const message = {
			text: 'Say my name !',
			author: 'Walter',
			isCurrentAuthor: true,
			date: new Date(),
		};
		const expectedHtml = sanitizeHtml(`<article class="me">
				<p>${new Date().toLocaleDateString('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				})}</p>
				<p class="author">Walter</p>
				<p class="message">Say my name !</p>
			</article>`);
		assert.strictEqual(sanitizeHtml(renderMessage(message)), expectedHtml);
	});

	it('should return the right html markup when isCurrentAuthor is false', () => {
		const message = {
			text: 'Say my name !',
			author: 'Walter',
			isCurrentAuthor: false,
			date: new Date(),
		};
		const expectedHtml = sanitizeHtml(`<article>
				<p>${new Date().toLocaleDateString('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				})}</p>
				<p class="author">Walter</p>
				<p class="message">Say my name !</p>
			</article>`);
		assert.strictEqual(sanitizeHtml(renderMessage(message)), expectedHtml);
	});
});
