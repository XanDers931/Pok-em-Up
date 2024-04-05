export default class BaseValue {
	width = 0;
	height = 0;
	frameRate = 0;
	spawnRate = 0;
	playerWidthSize = 0;
	playerHeightSize = 0;
	hitboxCheckRate = 0;
	projectileWidth = 0;
	projectileHeight = 0;
	bonusWidth = 0;
	bonusHeight = 0;

	static initialise(
		width,
		height,
		frameRate,
		spawnRate,
		playerWidthSize,
		playerHeightSize,
		hitboxCheckRate,
		projectileWidth,
		projectileHeight,
		bonusWidth,
		bonusHeight
	) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
		this.spawnRate = spawnRate;
		this.playerWidthSize = playerWidthSize;
		this.playerHeightSize = playerHeightSize;
		this.hitboxCheckRate = hitboxCheckRate;
		this.projectileWidth = projectileWidth;
		this.projectileHeight = projectileHeight;
		this.bonusWidth = bonusWidth;
		this.bonusHeight = bonusHeight;
	}
}
