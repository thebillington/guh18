// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a space invaders remake called 'Trump Invaders'

// Physics
var pSpeed = 5;
var bulletSpeed = 10;

// Variables to hold the images
var pImg;
var bImg;

// Set the fps
var FPS = 30;

// Create a variable to hold the list of bullets
var bullets;

// KEYS
var SPACE = 32;

// Setup function to link to the canvas
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Create an empty list of bullets
    bullets = [];
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Get the images
    pImg = loadImage("res/tank.png");
    bImg = loadImage("res/bullet.png");
    
    // Set the player properties
    pImg.x = width / 2;
    pImg.y = 550;
    pImg.w = 50;
    pImg.h = 50;
    
    // Set the fps
    frameRate(FPS);
    
}

// Create the game loop
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the player image
    image(pImg, pImg.x, pImg.y, pImg.w, pImg.h);
    
    // Update the bullets
    updateBullets();
    
    // Check key presses
    if (keyIsDown(RIGHT_ARROW)) {
        // Move to the right by player movement speed
        pImg.x += pSpeed;
    }
    if(keyIsDown(LEFT_ARROW)) {
        pImg.x -= pSpeed;
    }
    
}

// On key press
function keyPressed() {
    
    // Check the key
    if (keyCode == SPACE) {
        
        // Fire a bullet
        bullets.push({x:pImg.x + (pImg.w / 2), y:pImg.y});
        
    }
    
}

// Create a function to update the bullets
function updateBullets() {
    
    // Look at each bullet in reverse order
    for (var i = bullets.length - 1; i > -1; i--) {
        
        // Move the bullet
        bullets[i].y -= bulletSpeed;
        
        // Draw the bullet
        image(bImg, bullets[i].x, bullets[i].y, bImg.w, bImg.h);
        
    }
    
}