//inheritence
BowlingBall.prototype = new Entity();
BowlingBall.prototype.constructor = BowlingBall;

function BowlingBall(myX, myY, rand, game, spritesheet) {
    this.animation = new Animation(spritesheet, 600, 600, 1, .1, 1, true, .22);
    this.game = game;
    this.ctx = game.ctx;

    this.width = 1085;
    this.height = 433;

    if (rand === true){
        this.x = myX;
        this.y = myY;
    } else {
        this.x = 300;
        this.y = 100;
    }
   
    this.velocityX = 10; 
    this.velocityY = 9;

    this.accelerationX = 0;
    this.accelerationY = 0;

    this.mass = 3;

}


BowlingBall.prototype.draw = function () {
  
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BowlingBall.prototype.update = function () {

    this.velocityX += this.accelerationX; 
    this.velocityY += this.accelerationY; 

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.accelerationX *= 0;
    this.accelerationY *= 0;

    if (this.y >= this.height) {
        this.y = this.height;
        this.velocityY *= -.60;
        this.velocityX = 1;
    }

    if (this.y <= 0) {
        this.velocityY *= -1;
        this.y = 0;
    }

    if (this.x <= 0) {
        this.velocityX *= -1;
        this.x = 0;
    }

    if (this.x >= this.width) {      
        this.x = this.width;
        this.velocityX *= -1;
  
    } 
      
}
BowlingBall.prototype.applyForce = function (forceX, forceY) {

    var fx = forceX / this.mass;
    var fy = forceY / this.mass;

    this.accelerationX += fx;
    this.accelerationY += fy;

}

