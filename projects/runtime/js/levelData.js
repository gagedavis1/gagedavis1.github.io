var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems:
        [
          { type: "enemy", x: 400, y: groundY -120, image: 'img/fireball.png', moveX: -33, moveY: -33, velo: -4, scaleX: 0.7, scaleY: 0.7, damage: -10, points: 100},
          { type: "enemy", x: 700, y: groundY -120, image: 'img/fireball.png', moveX: -33, moveY: -33, velo: -4, scaleX: 0.7, scaleY: 0.7, damage: -10, points: 100},
          { type: "enemy", x: 900, y: groundY -50, image: 'img/Roomba.png', moveX: -23, moveY: -25, velo: -4, scaleX: 0.25, scaleY: 0.25, damage: -20, points: 100},
          { type: "reward", x: 1500, y: groundY -20, image: 'img/MushroomReward.png', moveX: -36, moveY: -33, velo: 4, scaleX: 1, scaleY: 1, hp: 100, points: 100},
          { type: "marker", x: 2500, y: groundY -100, image: 'img/Flag.png', moveX: -20, moveY: -15, velo: -4, scaleX: 1, scaleY: 1, hp: 100, points: 100},  //fix the placeholders you bum ^ (not you Ms. S)
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
