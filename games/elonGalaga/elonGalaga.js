// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a recreation of Galaga for Elon Musk

// Prevent standard key presses
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Create variables to hold the images
var bgImages = [];
var menuImg;
var pImg;
var pickup;
var meteor;
var dieImg;

// Variables to hold info about the background frame
var currentBG;
var nextBG;
var timer;

// Set the base url
var baseURL = "games/elonGalaga/";

// Set the space key code
var SPACE = 32;

// Variable to hold the state
var state;

// Set the physics
var pSpeed = 8;
var pickupSpeed;
var meteorSpeed;

// Variable to hold the score
var score;

// Set the timeout for ambience
var timerStep;

// Create the setup function
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Get all the images
    loadBackgroundImages();
    currentBG = 0;
    menuImg = loadImage(baseURL + "res/main.png");
    pImg = loadImage(baseURL + "res/car.png");
    pickup = loadImage(baseURL + "res/pickup.png");
    meteor = loadImage(baseURL + "res/meteor.png");
    dieImg = loadImage(baseURL + "res/gameOver.png");
    
    // Setup the locations of entities
    pImg.w = 80;
    pImg.h = 120;
    pImg.x = width / 2 - pImg.w / 2;
    pImg.y = height - pImg.h - 10;
    pickup.w = 60;
    pickup.h = 60;
    
    // Set the frame rate
    frameRate(30);
    
    // Set the state to main menu by default
    state = "main";
    
    // Start the background timer
    goToNextBG();
    
    // Set the score
    score = 0;
    
    // Setup the text
    fill(255);
    textSize(32);
    
    // Set the speeds of pickups and enemies
    pickupSpeed = 10;
    meteorSpeed = 15;
    
    // Generate a pickup
    generatePickup();
    
    // Generate a meteor
    generateMeteor();
    
    // Set the timer steps
    timerStep = 200;
    
}

// Render function
function draw() {
    
    // Check the state
    if (state == "main") {
        
        // Draw the menu image
        image(menuImg, 0, 0, 600, 600);
        
    }
    
    else if (state == "play") {
        
        // Draw the background
        image(bgImages[currentBG], 0, 0, 600, 600);
        
        // Check if we need to go to the next background
        if (nextBG) {
            
            // Set next background to false
            nextBG = false;
            
            // Go to the next bg and check wrap
            currentBG++;
            if (currentBG == bgImages.length) {
                currentBG = 0;
            }
            
        }
        
        // Draw the player
        image(pImg, pImg.x, pImg.y, pImg.w, pImg.h);
        
        // Draw the pickup
        image(pickup, pickup.x, pickup.y, pickup.w, pickup.h);
        
        // Move the pickup
        pickup.y += pickupSpeed;
        
        // Check if we need to spawn a new pickup
        if (pickup.y > height) {
            
            // Generate a pickup
            generatePickup();
            
        }
        
        // Draw the meteor
        image(meteor, meteor.x, meteor.y, meteor.w, meteor.h);
        
        // Move the meteor
        meteor.y += meteorSpeed;
        
        // Check if we need to spawn a new meteor
        if (meteor.y > height) {
            
            // Generate a meteor
            generateMeteor();
        
            // If the score is divisible by 5 or 9, increase speeds
            score++;
            if (score % 5 == 0 || score % 9 == 0) {
                console.log("HERE");
                pickupSpeed += 0.1;
                meteorSpeed += 0.1;
            }
            
        }
        
        // Check if the player has collided with the pickup
        if (rectCollision(pImg, pickup)) {
            score += 2;
            if (score % 5 == 0 || score % 9 == 0) {
                console.log("HERE");
                pickupSpeed += 0.1;
                meteorSpeed += 0.1;
            }
            timerStep = 200 - score;
            if (timerStep < 20) {
                timerStep = 20;
            }
            generatePickup();
        }
        
        // Check if the player has collided with the meteor
        if (rectCollision(pImg, meteor)) {
            
            //DIE
            state = "dead";
            
        }
        
        // Check key presses
        if (keyIsDown(RIGHT_ARROW)) {
            pImg.x += pSpeed;
            
            // Keep Elon on screen
            if (pImg.x + pImg.w > width + 10) {
                
                pImg.x = width - pImg.w;
                
            }
        }
        if (keyIsDown(LEFT_ARROW)) {
            pImg.x -= pSpeed;
            
            // Keep Elon on screen
            if (pImg.x < - 10) {
                
                pImg.x = 0;
                
            }
        }
        
        // Show the score
        text("Score: " + score, 10, 30);
        
    }
    
    else {
        
        // Draw the game over screen
        image(dieImg, 0, 0, 600, 600);
        text("You scored: " + score, 10, 200);
        
    }
    
}

// On key press
function keyPressed() {
    
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

// Function to change background image
function goToNextBG() {
    
    // Set a flag to go to the next background
    nextBG = true;
    
    // Update the timer
    timer = setTimeout(goToNextBG, timerStep);
    
}

// Function to load all the images for the background
function loadBackgroundImages() {
    
    // Load each image
    for (var i = 1; i < 8; i++) {
        
        // Add the image to the array
        bgImages.push(loadImage(baseURL + "res/psych" + i + ".png"));
        
    }
    
}

// Function to spawn a random pickup
function generatePickup() {
    
    // Generate a random x location
    pickup.x = getRandomInt(50, 520);
    pickup.y = getRandomInt(-500, -2000);
    
    // Check whether the metwor is colliding with the pickup
    while (rectCollision(meteor, pickup)) {
    
        // Generate a random x location
        pickup.x = getRandomInt(50, 520);
        pickup.y = getRandomInt(-500, -2000);
        
    }
    
}

// Function to spawn a random meteor
function generateMeteor() {

    // Generate a random x location
    meteor.x = getRandomInt(50, 520);
    meteor.y = getRandomInt(-200, -800);
    meteor.w = getRandomInt(20, 100);
    meteor.h = meteor.w;
    
    // Check whether the metwor is colliding with the pickup
    while (rectCollision(meteor, pickup)) {
    
        // Generate a random x location
        meteor.x = getRandomInt(50, 520);
        meteor.y = getRandomInt(-200, -800);
        
    }
    
}

// Function to check for a standard block collision
function rectCollision(rectOne, rectTwo) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((rectOne.x + rectOne.w / 2) - (rectTwo.x + rectTwo.w / 2)) < rectOne.w / 2 + rectTwo.w / 2 && Math.abs((rectOne.y + rectOne.h / 2) - (rectTwo.y + rectTwo.h / 2)) < rectOne.h / 2 + rectTwo.h / 2;
    
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}