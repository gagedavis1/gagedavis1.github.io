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
      sawBladeHitZone.addChild(obstacleImage); //adds sawblade hitzone
      obstacleImage.x = -26; //changes where the image appears relative to the hitzone
      obstacleImage.y = -26; //changes where the image appears relative to the hitzone 
      obstacleImage.rotationalVelocity = 10; //sets the rotation of the image
    }

  

    function createEnemy(x, y, img, moveX, moveY, velo, scaleX, scaleY, dmg, points){ //re-usable function to create any enimies or obstacles
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap(img);
      redSquare.x = moveX;
      redSquare.y = moveY;
      enemy.addChild(redSquare);
      enemy.x = x; //sets x of the enemy depending on the variable
      enemy.y = y;//sets y of the enemy depending on the variable
      game.addGameItem(enemy); //adds enemy to the game
      enemy.velocityX = velo; //sets the speed of the enemy depending on variable amount
      enemy.rotationalVelocity = 0 //how fast the enemy spins (set to 0 since i wont need it for my game)
      enemy.onPlayerCollision = function () { //function that adds player collision to enemy
      game.changeIntegrity(dmg) //when player collides with enemy damage will be dealt depending on varible amount
      enemy.fadeOut() //when the player collides with enemy the enemy will fade out
      redSquare.scaleX = scaleX; //scales the X of the enemy depending on varible amount
      redSquare.scaleY = scaleY; //scales the Y of the enemy depending on varible amount
      };
      enemy.onProjectileCollision = function (){ //function that adds projectile collision to the enemy
        game.increaseScore(points); //when the projectile collides with enemy, the score will increase by variable amount
        enemy.fadeOut(); //when the projectile collides with enemy the enemy will fade out and be impermiable
      }
    };


    function createReward(x, y, img, moveX, moveY, velo, scaleX, scaleY, hp, points){ //re-usable function to create a reward that can be tailored to needs
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap(img);
      blueSquare.x = moveX;
      blueSquare.y = moveY;
      reward.addChild(blueSquare);
      reward.x = x;//sets x of the reward depending on the variable
      reward.y = y;//sets y of the reward depending on the variable
      game.addGameItem(reward); //adds reward to game item
      reward.velocityX = -velo; //sets the speed of the reward depending on variable amount
      blueSquare.scaleX = scaleX //scales the X of the reward depending on varible amount
      blueSquare.scaleY = scaleY //scales the Y of the reward depending on varible amount
      reward.onPlayerCollision = function () { //function that adds player collision to reward
        game.increaseScore(points);
        game.changeIntegrity(hp) //when player collides with rewards damage will be dealt depending on varible amount
        reward.shrink(); //when the projectile collides with reward the reward will fade out
      };
    }

    function createMarker(x, y, img, moveX, moveY, velo, scaleX, scaleY, hp, points){ //function that creates a marker, that when player interacts the next level will begin
      var marker = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap(img);
      redSquare.x = moveX;
      redSquare.y = moveY;
      marker.addChild(redSquare);
      marker.x = x;//sets x of the reward depending on the variable
      marker.y = y;//sets y of the reward depending on the variable
      game.addGameItem(marker);
      marker.velocityX = velo; //sets the speed of the reward depending on variable amount
      marker.rotationalVelocity = 0
      marker.onPlayerCollision = function () {//function that adds player collision to reward
      redSquare.scaleX = scaleX; //scales the X of the reward depending on varible amount
      redSquare.scaleY = scaleY;//scales the Y of the reward depending on varible amount
      };
      marker.onPlayerCollision = function (){  //makes it so that when player collides hp is provided and the next level begins
        game.changeIntegrity(hp);
        startLevel(); 
      }
    };


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems;
      for(var i = 0; i < levelObjects.length; i++){//for loops that iterates over the amount of level objects
        var element = levelObjects[i];
        if (element.type === "sawblade"){ //links together the sawblade element and the createSawBlade function
          createSawBlade(element.x, element.y)
        }
        if (element.type === "enemy"){ //links together the enemy element and the createEnemy function
          createEnemy(element.x, element.y, element.image, element.moveX, element.moveY, element.velo, element.scaleX, element.scaleY, element.damage, element.points)
        }
        if (element.type === "reward"){ //links together the Reward element and the createReward function 
          createReward(element.x, element.y, element.image, element.moveX, element.moveY, element.velo, element.scaleX, element.scaleY, element.hp, element.points)
        }
        if (element.type === "marker"){ //links together the Marker element and the Marker function
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
