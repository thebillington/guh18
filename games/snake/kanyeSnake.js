// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a simple snake game

// Prevent standard key presses
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Store the grid size
var gridSize = 20;

// Canvas size
var cSize = 600;

// Pixel size
var pixelSize;

// List to hold the snake
var snake;

// Snake speed
var speed;

// Store the powerup
var powerup;

// Store current direction
var direction;

// Variable to store the images
var bImg;
var kImg;
var mImg;
var yImg;
var manuImg;

// Variable to store the state
var state;

// Set the base URL
var baseURL = "games/snake/";

// Variable to hold the score
var score;

// Set the space key code
var SPACE = 32;

// Function to return a coordinate
function Coord(x, y) {
    
    // Return the object
    return {"x": x, "y": y};
    
}

// Setup function
function setup() {
    
    // Create a canvas
    var canvas = createCanvas(cSize, cSize);
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Set the frame rate
    frameRate(5);
    
    // Get the images
    bImg = loadImage(baseURL + "res/background.png");
    kImg = loadImage(baseURL + "res/kanye.png");
    mImg = loadImage(baseURL + "res/pickup.png");
    yImg = loadImage(baseURL + "res/body.png");
    menuImg = loadImage(baseURL + "res/main.png");
    
    // Calculate pixel size
    pixelSize = width / gridSize;
    
    // Create the snake
    snake = [Coord(2, 0), Coord(1, 0), Coord(0, 0)];
    
    // Set the snakes speed
    speed = {"dx": 1, "dy": 0};
    
    // Generate a powerup
    powerup = getRandCoord();
    
    // Set the direction
    direction = "right";
    
    // Set the initial state
    state = "main";
    
    // Set the initial score
    score = 0;
    
}

// Render function
function draw() {
    
    // Check if we are in a state of playe
    if (state == "main") {
        
        // Draw the main menu
        image(menuImg, 0, 0, 600, 600);
        
    }
    
    else {
        
        // Draw the background
        image(bImg, 0, 0, 600, 600);

        // Draw the powerup
        image(mImg, powerup.x * pixelSize, powerup.y * pixelSize, pixelSize, pixelSize);

        // Draw the snake
        drawSnake();

        // Update the snake
        updateSnake();

        // Check if the powrup was eaten
        eaten();

        // Check for death
        death();
        
        // Draw the score
        fill(0);
        text("Score: " + score, 25, 25);
        
    }
    
}

// Function to update the snake
function updateSnake() {
    
    // Move each of the pixels
    for (var i = snake.length - 1; i > 0; i--) {
        
        // Move the pixel to the previous location
        snake[i] = {"x":snake[i - 1].x, "y":snake[i - 1].y};
        
    }
    
    // Check the value
    if (keyIsDown(LEFT_ARROW) && direction !== "right") {
        
        // Set the speed
        speed = {"dx": -1, "dy": 0}
        direction = "left";
    }
    if (keyIsDown(RIGHT_ARROW) && direction !== "left") {
        
        // Set the speed
        speed = {"dx": 1, "dy": 0}
        direction = "right";
    }
    if (keyIsDown(UP_ARROW) && direction !== "down") {
        
        // Set the speed
        speed = {"dx": 0, "dy": -1}
        direction = "up";
    }
    if (keyIsDown(DOWN_ARROW) && direction !== "up") {
        
        // Set the speed
        speed = {"dx": 0, "dy": 1}
        direction = "down";
    }
    
    // Move the last location by speed
    snake[0] = {"x": snake[0].x + speed.dx, "y": snake[0].y + speed.dy}
    
    // Check if the head has wrapped
    if (snake[0].x < 0) {
        snake[0].x = gridSize - 1;
    }
        
    if (snake[0].x >= gridSize) {
        snake[0].x = 0;
    }
    if (snake[0].y < 0) {
        snake[0].y = gridSize - 1;
    }
        
    if (snake[0].y >= gridSize) {
        snake[0].y = 0;
    }
    
}

// Function to check if the player has eaten the powerup
function eaten() {
    
    // If the tail has collided with the powerup
    if (snake[0].x == powerup.x && snake[0].y == powerup.y) {
        
        // Add one to the score
        score++;
        
        // Move the powerup against the direction of motion
        powerup.x -= speed.dx;
        powerup.y -= speed.dy;
        
        // Add to the tail of the snake
        snake.push(powerup);
        
        // Generate a new powerup
        powerup = getRandCoord();
        
    }
    
}

// Function to check whether the snakle has died
function death() {
    
    // Check each of the snakes body parts
    for (var i = 1; i < snake.length; i++) {
        
        // If the snakes head has collided
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            
            // DIE
            setup();
            
        }
        
    }
    
}

// Function to draw a gridSquare
function drawGridSquare(x, y, colour) {
    
    // Set the colour
    color(0);
    fill(colour);
    
    // Draw
    quad(x, y, x + pixelSize, y, x + pixelSize, y + pixelSize, x, y + pixelSize);
    
}

// Function to drawe a snake
function drawSnake() {
    
    // Draw the head of the snake
    image(kImg, snake[0].x * pixelSize, snake[0].y * pixelSize, pixelSize, pixelSize);
    
    // Draw each of the pixels
    for (var i = 1; i < snake.length; i++) {
        
        // Get the x and y
        image(yImg, snake[i].x * pixelSize, snake[i].y * pixelSize, pixelSize, pixelSize);
        
    }
    
}

// Check for key presses
function keyPressed() {
    
    // Check the value
    if (keyCode == LEFT_ARROW && direction !== "right") {
        
        // Set the speed
        speed = {"dx": -1, "dy": 0}
        direction = "left";
    }
    if (keyCode == RIGHT_ARROW && direction !== "left") {
        
        // Set the speed
        speed = {"dx": 1, "dy": 0}
        direction = "right";
    }
    if (keyCode == UP_ARROW && direction !== "down") {
        
        // Set the speed
        speed = {"dx": 0, "dy": -1}
        direction = "up";
    }
    if (keyCode == DOWN_ARROW && direction !== "up") {
        
        // Set the speed
        speed = {"dx": 0, "dy": 1}
        direction = "down";
    }
    
    // Check the key
    if (keyCode == SPACE) {
        
        if (state == "main") {
            
            state = "play";
            
        }
        
        else if (state != "play") {
            
            // Play the game
            setup();
            
        }
        
    }
    
}

// Function to generate a random coordinate
function getRandCoord() {
    
    // Return a random coordinate in the grid
    return {x: Math.floor(Math.random() * (gridSize)), y: Math.floor(Math.random() * (gridSize))}
    
}