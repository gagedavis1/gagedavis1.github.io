var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    
    function createSawBlade(x, y){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;// sets x pos. of the saw blade
      sawBladeHitZone.y = y; //sets sawblade hitzone height
      game.addGameItem(sawBladeHitZone); //implements the sawblade into the game itself.
      var obstacleImage = draw.bitmap("img/sawblade.png"); //draws a image onto sawblade hitzone
      sawBladeHitZone.addChild(obstacleImage); 
      obstacleImage.x = -26;
      obstacleImage.y = -26;
      obstacleImage.rotationalVelocity = 10;
    }

  

    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap('img/Roomba.png');
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -5;
      enemy.rotationalVelocity = 0
      enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10)
      redSquare.scaleX = 1;
      redSquare.scaleY = 1;
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(100);
        enemy.fadeOut(); 
      }
    };


    function createReward(x, y){
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.rect(50, 50, "blue");
      blueSquare.x = -25;
      blueSquare.y = -25;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -5;
      reward.rotationalVelocity = 10
      
      reward.onPlayerCollision = function () {
        game.increaseScore(100);
        game.changeIntegrity(10)
        reward.shrink();
      };
    }

    function createMarker(x, y){
      var marker = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "yellow")
      redSquare.x = -25;
      redSquare.y = -25;
      marker.addChild(redSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -5;
      marker.rotationalVelocity = 0
      marker.onPlayerCollision = function () {
      game.changeIntegrity(-10)
      redSquare.scaleX = 1;
      redSquare.scaleY = 1;
      };
      marker.onPlayerCollision = function (){
        game.changeIntegrity(100);
        startLevel(); 
      }
    };


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems;
      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if (element.type === "sawblade"){
          createSawBlade(element.x, element.y)
        }
        if (element.type === "enemy"){
          createEnemy(element.x, element.y)
        }
        if (element.type === "reward"){
          createMarker(element.x, element.y)
        }
        if (element.type === "marker"){
          createMarker(element.x, element.y)
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
