export default function getAllValueInTable(data) {
	let str = '';
	let nb = 0;
	data.forEach(score => {
		if (nb < 10) {
			str += `<tr><td>${score.name}</td><td>${score.score}</td></tr>`;
		}
		nb++;
	});
	return str;
}
