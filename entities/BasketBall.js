//inheritence
BasketBall.prototype = new Entity();
BasketBall.prototype.constructor = BasketBall;

function BasketBall(myX, myY, rand, game, spritesheet) {
    this.animation = new Animation(spritesheet, 795, 797, 1, .1, 1, true, .17);
    this.game = game;
    this.ctx = game.ctx;

    this.width = 1100;
    this.height = 450;

    this.x = myX;
    this.y = myY;
    
   
    this.velocityX = 10; 
    this.velocityY = 15;

    this.accelerationX = 0;
    this.accelerationY = 0;

    this.mass = 2;

}


BasketBall.prototype.draw = function () {
  
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

BasketBall.prototype.update = function () {

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
        this.velocityX *= -.75;
        this.x = 0;
    }

    if (this.x > this.width) {      
        this.x = this.width;
        this.velocityX *= -.75;
  
    } 
      
}
BasketBall.prototype.applyForce = function (forceX, forceY) {

    var fx = forceX / this.mass;
    var fy = forceY / this.mass;

    this.accelerationX += fx;
    this.accelerationY += fy;

}

BasketBall.prototype.checkEdges = function (ball) {


}
