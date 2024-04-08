/**
 * A function to calculate the score base on the params
 * @param {*} monsterKill the number of ennemies kill by the player
 * @param {*} time how long the player is alive
 * @returns a score
 */
export function calculateScore(monsterKill, time) {
	return monsterKill * 10 + time;
}
