/**
 *
 * @param {the damager x position} damagerX
 * @param {the damager y position} damagerY
 * @param {the damager width} damagerWidth
 * @param {the damager height} damagerHeight
 * @param {the hit x position} hitX
 * @param {the damaged y position} hitY
 * @param {the damaged width} hitWidht
 * @param {the damaged height} hitHeight
 * @returns
 */
export function collider(damagerX, damagerY, damagerWidth, damagerHeight, hitX, hitY, hitWidht, hitHeight){
	return damagerX < hitX + hitWidht &&
		   damagerX + damagerWidth > hitX &&
           damagerY < hitY + hitHeight &&
           damagerY + damagerHeight > hitY;
}