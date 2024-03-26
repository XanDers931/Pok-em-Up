import { Draw } from "../../vue/draw.js";

const ennemyWidhtSize = 40;
const ennemyHeightSize = 40;

export class Ennemy{
    x;
    y;
    ennemySkin;
    image;
    ennemySpeed;
    ennemyReady;

    constructor(skin, speed, fireRate){
        setTimeout(()=>{
            this.spawn();
        }, 100);
        this.ennemySpeed = speed;
        this.ennemySkin = skin;
        this.image = new Image();
        this.image.src = skin;
        this.ennemyReady = false;
        this.image.addEventListener('load', event =>{
            //setInterval(this.fire, 1000/fireRate);
            this.ennemyReady = true;
        })
    }

    spawn(){
        this.x = Draw.canvas.width-ennemyWidhtSize;
        this.y = getRandomArbitrary(0+ennemyHeightSize, Draw.canvas.width-ennemyHeightSize);
    }

    move(){
        this.x -= this.ennemySpeed;
    }

    /*
    fire(){
        new Projectile();
    }
    */

    getX() {
		return x;
	}

	getY() {
		return y;
	}

	getReady() {
		return this.ennemyReady;
	}

    display() {
		Draw.draw(this.image, this.x, this.y, ennemyWidhtSize, ennemyHeightSize);
	}

    getEnnemyHeight(){
        return ennemyHeightSize;
    }
    
    getEnnemyWidth(){
        return ennemyWidhtSize;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}