export function renderMessage(messages) {
	if (messages.isCurrentAuthor) {
		return `<article class="me">
				<p>${messages.date.toLocaleDateString('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				})}</p>
				<p class="author">${messages.author}</p>
				<p class="message">${messages.text}</p>
			</article>`;
	} else {
		return `<article>
				<p>${messages.date.toLocaleDateString('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				})}</p>
				<p class="author">${messages.author}</p>
				<p class="message">${messages.text}</p>
			</article>`;
	}
}

export default function renderMessageList(messages) {
	return messages.map(renderMessage).join('');
}
