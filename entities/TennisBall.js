//inheritence
TennisBall.prototype = new Entity();
TennisBall.prototype.constructor = TennisBall;

function TennisBall(myX, myY, rand, game, spritesheet) {
    this.animation = new Animation(spritesheet, 2000, 2000, 1, .1, 1, true, .02);
    this.game = game;
    this.ctx = game.ctx;

    this.width = 1200;
    this.height = 510;

    if (rand === true){
        this.x = myX;
        this.y = myY;
    } else {
        this.x = 200;
        this.y = 100;
    }

    this.velocityX = 16; 
    this.velocityY = 16;

    this.accelerationX = 0;
    this.accelerationY = 0;

    this.mass = 1.5;

}


TennisBall.prototype.draw = function () {
  
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

TennisBall.prototype.update = function () {

    this.velocityX += this.accelerationX; 
    this.velocityY += this.accelerationY; 

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.accelerationX *= 0;
    this.accelerationY *= 0;

    if (this.y >= this.height) {
        this.y = this.height;
        this.velocityY *= -1;
    }

    if (this.y <= 0) {
        this.velocityY *= -1;
        this.y = 0;
    }

    if (this.x <= 0) {
        this.velocityX *= -.8;
        this.x = 0;
    }

    if (this.x > this.width) {      
        this.x = this.width;
        this.velocityX *= -.8;
  
    } 
      
}
TennisBall.prototype.applyForce = function (forceX, forceY) {

    var fx = forceX / this.mass;
    var fy = forceY / this.mass;

    this.accelerationX += fx;
    this.accelerationY += fy;

}

