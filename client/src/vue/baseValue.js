export class BaseValue {
	width = width;
	height = height;
	frameRate = frameRate;

	static initialise(width, height, frameRate) {
		this.width = width;
		this.height = height;
		this.frameRate = frameRate;
	}
}
