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

  

    function createEnemy(x, y, img, moveX, moveY, velo, scaleX, scaleY, dmg, points){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap(img);
      redSquare.x = moveX;
      redSquare.y = moveY;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = velo;
      enemy.rotationalVelocity = 0
      enemy.onPlayerCollision = function () {
      game.changeIntegrity(dmg)
      enemy.fadeOut()
      redSquare.scaleX = scaleX; 
      redSquare.scaleY = scaleY;
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(points);
        enemy.fadeOut(); 
      }
    };


    function createReward(x, y, img, moveX, moveY, velo, scaleX, scaleY, hp, points){
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap(img);
      blueSquare.x = moveX;
      blueSquare.y = moveY;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -velo;
      blueSquare.scaleX = scaleX
      blueSquare.scaleY = scaleY
      reward.onPlayerCollision = function () {
        game.increaseScore(points);
        game.changeIntegrity(hp)
        reward.shrink();
      };
    }

    function createMarker(x, y, img, moveX, moveY, velo, scaleX, scaleY, hp, points){
      var marker = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap(img);
      redSquare.x = moveX;
      redSquare.y = moveY;
      marker.addChild(redSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = velo;
      marker.rotationalVelocity = 0
      marker.onPlayerCollision = function () {
      redSquare.scaleX = scaleX;
      redSquare.scaleY = scaleY;
      };
      marker.onPlayerCollision = function (){
        game.changeIntegrity(hp);
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
          createEnemy(element.x, element.y, element.image, element.moveX, element.moveY, element.velo, element.scaleX, element.scaleY, element.damage, element.points)
        }
        if (element.type === "reward"){
          createReward(element.x, element.y, element.image, element.moveX, element.moveY, element.velo, element.scaleX, element.scaleY, element.hp, element.points)
        }
        if (element.type === "marker"){
          createMarker(element.x, element.y, element.image, element.moveX, element.moveY, element.velo, element.scaleX, element.scaleY, element.hp, element.points)
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
