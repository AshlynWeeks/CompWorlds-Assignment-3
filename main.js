var AM = new AssetManager();


//Basketball
AM.queueDownload("./img/basketball.png"); 
AM.queueDownload("./img/Bubble.png"); 
AM.queueDownload("./img/Bubble Pop.png"); 
AM.queueDownload("./img/Tennis Ball.png"); 
AM.queueDownload("./img/Bowling Ball.png"); 


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var loadedGame = false;
    
    
        console.log("Loaded Game?: "+AM.isDone());
        if (AM.isDone()){
            var gameEngine = new GameEngine();

            gameEngine.init(ctx);
            gameEngine.start();

            var myManager = new BallManager(gameEngine);
            gameEngine.addEntity(myManager);
            //create new classes here
 
            
        
    } 
    

    console.log("All Done!"); 
});




