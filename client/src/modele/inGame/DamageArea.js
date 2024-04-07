/**
 * Class to manage a damageArea of the game to check the collision.
 * id - The id of the damageArea to know the one who have collision.
 * firstX, firstY - The position of the points.
 * secondX, secondY - Their size for the range.
 */
export default class DamageArea {
	id;
	firstX;
	firstY;
	secondX;
	secondY;

	constructor(firstX, firstY, secondX, secondY) {
		this.firstX = firstX;
		this.firstY = firstY;
		this.secondX = secondX;
		this.secondY = secondY;

	}
}
