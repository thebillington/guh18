// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a space invaders remake called 'Trump Invaders'

// Physics
var pSpeed = 5;
var bulletSpeed = 10;

// Variables to hold the images
var pImg;
var bImg;
var wImg;

// Set the fps
var FPS = 30;

// Create a variable to hold the list of bullets
var bullets;

// Create a variable to hold each of the sections of wall
var wall;

// KEYS
var SPACE = 32;

// Setup function to link to the canvas
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Create an empty list of bullets
    bullets = [];
    
    // Create an empty list to hold all of the chunks of wall
    wall = [];
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Get the images
    pImg = loadImage("res/tank.png");
    bImg = loadImage("res/bullet.png");
    wImg = loadImage("res/bricks.png");
    
    // Set the player properties
    pImg.w = 80;
    pImg.h = 80;
    pImg.x = (width / 2) - (pImg.w / 2);
    pImg.y = height - pImg.h;
    
    // Set the image widths and heights
    bImg.w = 5;
    bImg.h = 5;
    wImg.w = 20;
    wImg.h = 20;
    
    // Generate the walls
    generateWalls();
    
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
    
    // Draw the walls
    drawWalls();
    
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
            
        // Set bullet collide to false
        var bCollide = false;
        
        // Check if the bullet is off screen
        if (bullets[i].y < 0) {
            bullets.splice(i,1);
            continue;
        }
        
        // Check if the bullet has hit any wall
        for (var j = wall.length - 1; j > -1; j--) {
            
            // Check for a collision between the bullet and wall
            if (rectCollision(bullets[i].x, bullets[i].y, bImg.w, bImg.h, wall[j].x, wall[j].y, wImg.w, wImg.h)) {
                
                console.log(j);
                
                // Remove the wall and the bullet
                bullets.splice(i,1);
                wall.splice(j,1);
                bCollide = true;
                break;
                
            }
            
        }
        
        // Check if the bullet has been deleted and if so, skip this bullet
        if (bCollide) {
            continue;
        }
        
        // Draw the bullet
        image(bImg, bullets[i].x, bullets[i].y, bImg.w, bImg.h);
        
    }
    
}

// Function to draw each section of wall
function drawWalls() {
    
    // Look at each section of wall
    for (var i = wall.length - 1; i > -1; i--) {
        
        // Draw the wall section
        image(wImg, wall[i].x, wall[i].y, wImg.w, wImg.h);
        
    }
    
}

// Function to generate the walls
function generateWalls() {
    
    // Set the base location and width/height of the wall sections
    var wallX = 40;
    var wallY = height / 2 + 50;
    var wallW = 100;
    var wallH = 100;
    
    // Create 4 sections of wall
    for (var base = 0; base < 4; base++) {
        
        // n^2 loop to iteratively create the rows and colums of each wall for each base
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                
                // Generate the wall
                wall.push({x:wallX + (base * (wallX + wallW)) + (i * wImg.w), y: wallY + (j * wImg.h)});
                
            }
        }
    }
}

// Function to check for a rect collision
function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((x1 + w1 / 2) - (x2 + w2 / 2)) < w1 / 2 + w2 / 2 && Math.abs((y1 + h1 / 2) - (y2 + h2 / 2)) < h1 / 2 + h2 / 2;
    
}