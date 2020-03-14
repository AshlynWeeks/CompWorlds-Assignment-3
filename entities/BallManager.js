var balls = [];
var randomBalls = [];

//inheritence
BallManager.prototype = new Entity();
BallManager.prototype.constructor = BallManager;


function BallManager(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.mousedown = 0;
    var that = this;

    //Set up screen with several balls
    this.initBall();

    //Detect mouse clicks 
    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }

    //Left mouse click
    this.ctx.canvas.addEventListener("click", function (e) {
        that.click = getXandY(e);
        console.log(e);

        var random = Math.floor(Math.random() * 4); 
        console.log(random);            

        switch(random) {
            
            //Adds 50 bubbles
            case 1:
                var bb = new BowlingBall(e.clientX,e.clientY, true, game, AM.getAsset("./img/Bowling Ball.png"))
                game.addEntity(bb);
                randomBalls.push(bb);
                break;

            //Adds a tennis ball
            case 2:
                var ball2 = new TennisBall(e.clientX,e.clientY, true,game, AM.getAsset("./img/Tennis Ball.png"));
                game.addEntity(ball2);
                randomBalls.push(ball2);
                break;

            //Adds a basket ball
            case 3:
                var ball3 = new BasketBall(e.clientX,e.clientY, true, game, AM.getAsset("./img/basketball.png"));
                game.addEntity(ball3);
                randomBalls.push(ball3);
                break;

            //Adds bubbles
            default:
                for(var i = 0; i < 100; i++){
                    var bubble = new Bubble(0, 0, false, game, AM.getAsset("./img/Bubble.png"));
                    game.addEntity(bubble);
                    randomBalls.push(bubble);
                    console.log("added bubble");
                 }
          }
    }, false);

    //Right mouse click
    this.ctx.canvas.addEventListener("contextmenu", function (e) {
        that.click = getXandY(e);
        console.log(e);
        if(that.mousedown === 0){
            that.mousedown = 1;
        } else {
            that.mousedown = 0;
        }
        
        e.preventDefault();

    }, false);
}

BallManager.prototype.initBall = function () {

    var myX = 0;
    var myY = 0;
    randomBalls[0] = new BasketBall(myX, myY, false, this.game, AM.getAsset("./img/basketball.png"));
    randomBalls[1] = new TennisBall(myX, myY, false, this.game, AM.getAsset("./img/Tennis Ball.png"));
    randomBalls[2] = new BowlingBall(myX, myY, false, this.game, AM.getAsset("./img/Bowling Ball.png"));

    this.game.addEntity(randomBalls[0]);
    this.game.addEntity(randomBalls[1]);
    this.game.addEntity(randomBalls[2]);

    for(var i = 0; i < 100; i++){
        var mybubble = new Bubble(myX, myY, false, this.game, AM.getAsset("./img/Bubble.png"));
        this.game.addEntity(mybubble);
        randomBalls.push(mybubble);
    }

}

BallManager.prototype.draw = function () {
  
}

BallManager.prototype.update = function () {
    
    if (this.mousedown === 1){

        for(var i = 0; i < randomBalls.length; i++){
            if(randomBalls[i] instanceof BasketBall){
                randomBalls[i].applyForce(3, 5);
            } else if (randomBalls[i] instanceof TennisBall){
                randomBalls[i].applyForce(1, 2.5);

            } else if (randomBalls[i] instanceof Bubble) {
                randomBalls[i].applyForce(50, 0);

            } else if (randomBalls[i] instanceof BowlingBall){
                randomBalls[i].applyForce(20, 15);

            } 
        }
    } else {

        for(var i = 0; i < randomBalls.length; i++){
            if(randomBalls[i] instanceof BasketBall){
                randomBalls[i].applyForce(0, 5);
            } else if (randomBalls[i] instanceof TennisBall){
                randomBalls[i].applyForce(0, 2.5);

            } else if (randomBalls[i] instanceof BowlingBall){
                randomBalls[i].applyForce(0, 15);

            } 
        }

    }

}

