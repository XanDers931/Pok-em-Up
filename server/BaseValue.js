/**
 * Classe de gestion des constantes
 * Permet de stocker et initialiser les constantes du jeu
 */
export default class BaseValue {
	/**
	 * Game Global Values
	 */
	width = 0;
	height = 0;
	frameRate = 0;
	spawnRate = 0;

	/**
	 * Initialize the Game Global Values
	 */
	static initialiseSimpleValue(width, height, frameRate, spawnRate) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
		this.spawnRate = spawnRate;
	}

	/**
	 * Player Values
	 */
	playerWidthSize = 0;
	playerHeightSize = 0;
	generalSpeed = 0;
	playerBorder = 0;
	maxSpeed = 0;
	decreaseSpeedMult = 0;

	/**
	 * Initialize the Player Values
	 */
	static initialisePlayer(
		playerWidthSize,
		playerHeightSize,
		generalSpeed,
		playerBorder,
		maxSpeed,
		decreaseSpeedMult
	) {
		this.playerWidthSize = playerWidthSize;
		this.playerHeightSize = playerHeightSize;
		this.generalSpeed = generalSpeed;
		this.playerBorder = playerBorder;
		this.maxSpeed = maxSpeed;
		this.decreaseSpeedMult = decreaseSpeedMult;
	}
}
