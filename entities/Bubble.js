//inheritence
Bubble.prototype = new Entity();
Bubble.prototype.constructor = Bubble;

function Bubble(myX, myY, rand, game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 512, 1, .1, 1, true, .09);
    this.game = game;
    this.ctx = game.ctx;
    this.popped = "false";

    this.width = 1165;
    this.height = 510;

    if (rand === true){ //will always be random
        this.x = myX;
        this.y = myY;
    } else {
        this.x = Math.floor(Math.random() * 1077);  
        this.y = Math.floor(Math.random() * 477);
    }

    this.velocityX = Math.floor(Math.random() * 10 + 1) * (Math.round(Math.random()) * 2 - 1) ; 
    this.velocityY = Math.floor(Math.random() * 10 + 1) * (Math.round(Math.random()) * 2 - 1) + 2;

    this.mass = 1;

}



Bubble.prototype.draw = function () {
  
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Bubble.prototype.update = function () {

    if (this.popped === "false"){
        
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.y >= this.height) {
            this.y = this.height;
            this.velocityY *= -1;
            this.popped = "true";
            Bubble.prototype.pop.call(this);

        }

        if (this.y <= 0) {
            this.velocityY *= -1;
            this.y = 0;
            this.popped = "true";

            Bubble.prototype.pop.call(this);

        }

        if (this.x <= 0) {
            this.velocityX *= -1;
            this.x = 0;
            this.popped = "true";

            Bubble.prototype.pop.call(this);
        }

        if (this.x > this.width) {      
            this.x = this.width;
            this.velocityX *= -1;
            this.popped = "true";

            Bubble.prototype.pop.call(this);
        
        } 
    }
}
Bubble.prototype.pop = function () {
  
        this.animation = new Animation(AM.getAsset("./img/Bubble Pop.png"), 520, 512, 7, 0.03, 7, false, .09);
    
}

Bubble.prototype.applyForce = function (forceX, forceY) {

    this.velocityX += .5;

    var fx = forceX / this.mass;
    var fy = forceY / this.mass;

    this.accelerationX += fx;
    this.accelerationY += fy;

}



