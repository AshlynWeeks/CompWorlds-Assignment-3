var AM = new AssetManager();

//Basketball

AM.queueDownload("./img/basketball.png"); 
AM.queueDownload("./img/Bubble.png"); 
AM.queueDownload("./img/Bubble Pop.png"); 
AM.queueDownload("./img/Tennis Ball.png"); 
AM.queueDownload("./img/Bowling Ball.png"); 

var gameEngine;
var myManager;

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var loadedGame = false;
    
    
        console.log("Loaded Game?: "+AM.isDone());
        if (AM.isDone()){

            gameEngine = new GameEngine();
            gameEngine.init(ctx);
            gameEngine.start();

            myManager = new BallManager(gameEngine);
            gameEngine.addEntity(myManager);
            //create new classes here
 
            
        
    } 
    

    console.log("All Done!"); 
});

window.onload = function () {
    var socket = io.connect("http://24.16.255.56:8888");
  
    socket.on("load", function (data) {
    
        console.log("here");
        //console.log(data.size);
       for (var i = 0; i < randomBalls.length; i++){

            randomBalls[i].x = data.data.arrayX[i];
            randomBalls[i].y = data.data.arrayY[i];
            console.log("new x:" +  randomBalls[i].x + "new y: " +  randomBalls[i].y);
       }

    });
  
    var text = document.getElementById("text");
    var saveButton = document.getElementById("save");
    var loadButton = document.getElementById("load");
  
    saveButton.onclick = function () {
      console.log("save");
      text.innerHTML = "Saved."
      var tempArrayX = [];
      var tempArrayY = [];

      for (i = 0; i < randomBalls.length; i++){

            tempArrayX.push(randomBalls[i].x);
            tempArrayY.push(randomBalls[i].y);
            console.log("old x:" +   tempArrayX[i] + "old y: " +  tempArrayY[i])

      }
      socket.emit("save", { studentname: "Ashlyn Weeks", statename: "Ball's Previous Place", data: {arrayX: tempArrayX,  arrayY: tempArrayY}});

    };
  
    loadButton.onclick = function () {
      console.log("load");
      text.innerHTML = "Loaded."
      socket.emit("load", { studentname: "Ashlyn Weeks", statename: "Ball's Previous Place" });
    };
  
  };





