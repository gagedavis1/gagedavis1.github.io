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
        gameItems: [
          { type: "sawblade", x: 400, y: groundY -120 },
          { type: "sawblade", x: 600, y: groundY -120},
          { type: "sawblade", x: 900, y: groundY -120},
          { type: "enemy", x: 400, y: groundY -120, image: 'img/fireball.png', moveX: -23, moveY: -25, velo: -4, scaleX: 1, scaleY: 1, damage: 5, points: 100},
          { type: "enemy", x: 700, y: groundY -50, image: 'img/Roomba.png', moveX: -23, moveY: -25, velo: -4, scaleX: 0.25, scaleY: 0.25, damage: 3, points: 100},
          { type: "reward", x: 1000, y: groundY -20, image: 'img/placeholder.png', moveX: 0, moveY: 0, velo: 0, scaleX: 0, scaleY: 0, hp: 100, points: 100},
          { type: "marker", x: 1500, y: groundY -100 },  //fix the placeholders you bum ^ (not you Ms. S)
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
