/**
 * Class to manage constants.
 * Allow to store and initialize game constants.
 */
export default class BaseValue {
	/**
	 * Game Global Constants.
	 */
	width = 0;
	height = 0;
	frameRate = 0;
	spawnRate = 0;

	/**
	 * Initialize the Game Global Constants.
	 */
	static initialiseSimpleConstants(width, height, frameRate, spawnRate) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
		this.spawnRate = spawnRate;
	}

	/**
	 * Player Constants.
	 */
	playerWidth = 0;
	playerHeight = 0;
	generalSpeed = 0;
	playerBorder = 0;
	maxSpeed = 0;
	decreaseSpeedMult = 0;

	/**
	 * Initialize the Player Constants.
	 */
	static initialisePlayerConstants(
		playerWidth,
		playerHeight,
		generalSpeed,
		playerBorder,
		maxSpeed,
		decreaseSpeedMult
	) {
		this.playerWidth = playerWidth;
		this.playerHeight = playerHeight;
		this.generalSpeed = generalSpeed;
		this.playerBorder = playerBorder;
		this.maxSpeed = maxSpeed;
		this.decreaseSpeedMult = decreaseSpeedMult;
	}

	/**
	 * Background Constants.
	 */
	backgroundSpeed = 0;

	/**
	 * Initialize the Background Constants.
	 */
	static initialiseBackgroundConstants(backgroundSpeed) {
		this.backgroundSpeed = backgroundSpeed;
	}

	/**
	 * Ennemy Constants.
	 */
	ennemyWidth = 0;
	ennemyHeight = 0;

	/**
	 * Initialize the Ennemy Constants.
	 */
	static initialiseEnnemyConstants(ennemyWidth, ennemyHeight) {
		this.ennemyWidth = ennemyWidth;
		this.ennemyHeight = ennemyHeight;
	}

	/**
	 * Bonus Constants
	 */
	bonusWidth = 0;
	bonusHeight = 0;

	/**
	 * Initialize the Bonus Constants.
	 */
	static initialiseBonusConstants(
		bonusWidth,
		bonusHeight,
		bonusSpawnRate,
		bonusSpeed,
		bonusEffectNumber
	) {
		this.bonusWidth = bonusWidth;
		this.bonusHeight = bonusHeight;
		this.bonusSpawnRate = bonusSpawnRate;
		this.bonusSpeed = bonusSpeed;
		this.bonusEffectNumber = bonusEffectNumber;
	}

	static initialiseSkinIdList(skinIdlist) {
		this.skinIdlist = skinIdlist;
	}
}
