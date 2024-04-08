/**
 * Class to manage score of the game.
 * use to create the Scoreboard
 * name - the name of the player
 * score - the number of the score
 */
export default class ScoreData {
	name;
	score;

	constructor(name, score) {
		this.name = name;
		this.score = score;
	}
}
