
var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //created an empty varible for later use
        var circles = []; //created an empty varible with empty an empty array for later use
        // TODO 2 : Create a function that draws a circle 
       function drawCircle(){ //created our basic drawCircle function to call upon later
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); // code to draw our circles and make them active
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        
        //drawCircle() called our drawCircle function 5 times to create 5 circles, but code became obesolete
        //drawCircle()
        //drawCircle()
        //drawCircle()
        //drawCircle()
        
        for (var i = 0 ; i < 101 ; i++) { //basic for loop that calls upon the drawCircle function until i>=101
            drawCircle()
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // removed todo 4 since it was obsolete
            // TODO 4 : Update the circle's position 
           // physikz.updatePosition(circles[0]) updates the three circles position manually
            //physikz.updatePosition(circles[1])
           // physikz.updatePosition(circles[2])//*
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            // The commented code below became obsolete
            //game.checkCirclePosition(circles[0]) checks the three circles position manually
            //game.checkCirclePosition(circles[1])
            //game.checkCirclePosition(circles[2])

            // TODO 8 / 9 : Iterate over the array
            for (var i = 0 ; i < 101 ; i++) { // basic for loop that will update and check circle pos. until our index i>= 101
            physikz.updatePosition(circles[i])
            game.checkCirclePosition(circles[i])
            }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0) { //when the circle goes of the left of the screen it will reapear on the right side.
                circle.x = canvas.width
            }
            if ( circle.y > canvas.height) { //when the circle goes off the bottom of the screen it will reappear at the top
                circle.y = 0
            }
            if ( circle.y < 0 ) {//when the circle goes off the top of the screen it will reappear at the bottom.
                circle.y = canvas.height
            }


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
