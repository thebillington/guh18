// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a space invaders remake called 'Trump Invaders'

// Store the properties and location of the player
var px;
var py;
var pw;
var ph;
var pSpeed = 5;

// Variable to hold the playetr image
var pImg;

// Set the fps
var FPS = 30;

// Setup function to link to the canvas
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Get the player image
    pImg = loadImage("res/tank.png");
    
    // Set the player properties
    px = width / 2;
    py = 550;
    pw = 50;
    ph = 50;
    
    // Set the fps
    frameRate(FPS);
    
}

// Create the game loop
function draw() {
    
    // Clear the canvas
    clear();
    
    // Draw the image
    image(pImg, px, py, pw, ph);
    
    // Check key presses
    if (keyIsDown(RIGHT_ARROW)) {
        // Move to the right by player movement speed
        px += pSpeed;
    }
    if(keyIsDown(LEFT_ARROW)) {
        px -= pSpeed;
    }
    
}