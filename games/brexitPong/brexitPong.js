// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a simple pong game for 'Brexit Pong'

// Prevent standard key presses
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Create variables to hold the images
var ukImg;
var euImg;
var deal;
var parliament;
var mImg;

// Store the state
var state;

// Set the base url
var baseURL = "games/brexitPong/";

// Set the space key code
var SPACE = 32;

// Set the border widths
var borderWidth = 5;

// Variables to hold the x and y speeds of the deal
var xSpeed;
var ySpeed;

// Variables to hold the scores
var pScore;
var eScore;

// Create the setup function
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Get all the images
    ukImg = loadImage(baseURL + "res/uk.png");
    euImg = loadImage(baseURL + "res/eu.png");
    deal = loadImage(baseURL + "res/deal.png");
    parliament = loadImage(baseURL + "res/parliament.png");
    mImg = loadImage(baseURL + "res/main.png");
    
    // Setup the locationf of entities
    setupEntities();
    
    // Set the state to main menu by default
    state = "main";
    
    // Set the fill colour and line colour
    stroke(255);
    fill(255);
    textSize(32);
    
    // Set the scores
    pScore = 0;
    eScore = 0;
    
}

// Function to set the default locations of players and the ball
function setupEntities() {
    
    // Set the start locations of ball/players
    ukImg.w = 50;
    ukImg.h = 100;
    ukImg.x = 20;
    ukImg.y = height / 2 - ukImg.w;
    euImg.w = 50;
    euImg.h = 100;
    euImg.x = width - euImg.w - 20;
    euImg.y = height / 2 - euImg.w;
    deal.w = 50;
    deal.h = 50;
    deal.x = width / 2 - deal.w / 2;
    deal.y = height / 2 - deal.h / 2;
    
    // Set the speeds
    xSpeed = 3;
    ySpeed = getRandomInt(-3, 3);
    while (ySpeed == 0) {
        ySpeed = getRandomInt(-3, 3);
    }
    
}

// Create the render function
function draw() {
    
    // Check if we are on the main menu
    if (state == "main") {
        
        // Draw the main menu image
        image(mImg, 0, 0, 600, 600);
        
    }
    
    // Otherwise complete game logic
    else if (state == "play") {
        
        // Draw the background
        image(parliament, 0, 0, 600, 600);
        
        // Draw the
        rect(ukImg.x - borderWidth, ukImg.y - borderWidth, ukImg.w + borderWidth * 2, ukImg.h + borderWidth * 2);
        rect(euImg.x - borderWidth, euImg.y - borderWidth, euImg.w + borderWidth * 2, euImg.h + borderWidth * 2);
        
        // Draw the entities
        image(ukImg, ukImg.x, ukImg.y, ukImg.w, ukImg.h);
        image(euImg, euImg.x, euImg.y, euImg.w, euImg.h);
        image(deal, deal.x, deal.y, deal.w, deal.h);
        
        // Check key presses
        if (keyIsDown(UP_ARROW)) {
            
            // Move the player
            ukImg.y -= 5;
            
            // Check for off screen
            if (ukImg.y - borderWidth < 0) {
                
                ukImg.y = borderWidth;
                
            }
            
        }
        if (keyIsDown(DOWN_ARROW)) {
            
            // Move the player
            ukImg.y += 5;
            
            // Check for off screen
            if (ukImg.y + ukImg.h + borderWidth> height) {
                
                ukImg.y = height - ukImg.h - borderWidth;
                
            }
            
        }
        
        // Set the y location of the deal
        euImg.y = deal.y + deal.h / 2 - euImg.h / 2;
        
        // Check for off screen
        if (euImg.y - borderWidth < 0) {

            euImg.y = borderWidth;

        }
        if (euImg.y + ukImg.h + borderWidth> height) {

            euImg.y = height - euImg.h - borderWidth;

        }
        
        // Move the deal
        deal.x += xSpeed;
        deal.y += ySpeed;
        
        // Check if the deal has collided with either image
        if (rectCollision(ukImg, deal) || rectCollision(euImg, deal)) {
            
            // Switch the x direction
            xSpeed *= -1;
            deal.x += xSpeed;
            
        }
        
        // Switch the y direction when going off speed
        if (deal.y < 0 || deal.y > height - deal.h) {
            ySpeed *= -1;
            deal.y += ySpeed;
        }
        
        // Check if the enemy gained a point
        if (deal.x < 0) {
            
            eScore += 1;
            setupEntities();
            
        }
        
        // Setup the text
        text(""+pScore, 220, 100);
        text(""+eScore, 380, 100);
        
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

// Function to check for a standard block collision
function rectCollision(rectOne, rectTwo) {
    
    console.log("HERE");
    
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
