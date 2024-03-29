export default class BaseValue {
	width = 0;
	height = 0;
	frameRate = 0;
	spawnRate = 0;
	playerWidthSize = 0;
	playerHeightSize = 0;

	static initialise(
		width,
		height,
		frameRate,
		spawnRate,
		playerWidthSize,
		playerHeightSize
	) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
		this.spawnRate = spawnRate;
		this.playerWidthSize = playerWidthSize;
		this.playerHeightSize = playerHeightSize;
	}
}
