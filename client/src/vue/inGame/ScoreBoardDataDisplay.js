export default function getAllValueInTable(data) {
	let str = '';
	data.forEach(score => {
		str += `<tr><th>${score.name}</th><th>${score.score}</th></tr>`;
	});
	return str;
}
