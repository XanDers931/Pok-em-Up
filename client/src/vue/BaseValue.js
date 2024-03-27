export default class BaseValue {
	width = 0;
	height = 0;
	frameRate = 0;
	spawnRate = 0;
	hitboxCheckRate = 0;

	static initialise(width, height, frameRate, spawnRate, hitboxCheckRate) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
		this.spawnRate = spawnRate;
		this.hitboxCheckRate = hitboxCheckRate;
	}
}
