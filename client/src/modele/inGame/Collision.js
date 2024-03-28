/**
 *
 * @param {the value to check} value
 * @param {the first value of the area} otherValue
 * @param {the size of the area} size
 * @returns true if value is in the range of otherValue to otherValue + size
 * @returns false in the other case
 */
export function isIn(value, otherValue, size) {
	return (
		value > otherValue + size * 0.2 && value < otherValue + size - size * 0.35
	);
}

/**
 *
 * @param {List of coordinates off all the Area who deal damage actually} damageAreaList
 * @param {the Player x position} x
 * @param {the Player y position} y
 * @param {the Player width} width
 * @param {the Player height} height
 * @returns
 */
export function allColision(damageAreaList, x, y, width, height) {
	let ret = false;
	damageAreaList.forEach(element => {
		if (
			isIn(x, element.firstX, element.secondX) ||
			isIn(x + width, element.firstX, element.secondX) ||
			isIn(x + width / 2, element.firstX, element.secondX)
		) {
			if (
				isIn(y, element.firstY, element.secondY) ||
				isIn(y + height, element.firstY, element.secondY) ||
				isIn(y + height / 2, element.firstY, element.secondY)
			) {
				ret = true;
			}
		}
	});
	return ret;
}
