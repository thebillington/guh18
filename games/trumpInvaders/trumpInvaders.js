// Created by Billy Rebecchi for Great Uni Hack 2018
// Code to hold a space invaders remake called 'Trump Invaders'

// Physics
var pSpeed = 5;
var bulletSpeed = 10;

// Variables to hold the images
var pImg;
var bImg;
var wImg;
var eImg;
var bgImg;
var mainImg;
var dieImg;
var winImg;
var destroyImg;

// Set the fps
var FPS = 30;

// Create a variable to hold the list of bullets
var bullets;

// Create a variable to hold each of the sections of wall
var wall;

// Create a variable to hold each of the mexicans
var enemies;

// KEYS
var SPACE = 32;

// Store the enemy speed and whether they have switched direction
var enemySpeed = 2;
var switchedDirection;

// Store the state
var state;

// Variable to store the score
var score;

// Set the base url
var baseURL = "games/trumpInvaders/";

// Setup function to link to the canvas
function setup() {
    
    // Create the canvas and link to the document
    var canvas = createCanvas(600, 600);
    
    // Set the canvas parent
    canvas.parent("windowHolder");
    
    // Create an empty list of bullets
    bullets = [];
    
    // Create an empty list to hold all of the chunks of wall
    wall = [];
    
    // Create an empty list to hold the enemies
    enemies = [];
    
    // Get the images
    pImg = loadImage(baseURL + "res/tank.png");
    bImg = loadImage(baseURL + "res/bullet.png");
    wImg = loadImage(baseURL + "res/bricks.png");
    eImg = loadImage(baseURL + "res/mexican.png");
    bgImg = loadImage(baseURL + "res/USASmall.png");
    mainImg = loadImage(baseURL + "res/mainMenu.png");
    dieImg = loadImage(baseURL + "res/dieMenu.png");
    winImg = loadImage(baseURL + "res/winMenu.png");
    destroyImg = loadImage(baseURL + "res/destroyMenu.png");
    
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
    eImg.w = 25;
    eImg.h = 30;
    
    // Set the enemies having switched direction to false
    switchedDirection = false;
    
    // Generate the walls
    generateWalls();
    
    // Generate the enemies
    generateEnemies();
    
    // Set the fps
    frameRate(FPS);
    
    // Set the state to main menu
    state = "main";
    
    // Set the score to zero
    score = 0;
    
}

// Create the game loop
function draw() {
    
    // Check the state
    if (state == "main") {
        
        // Draw the main menu image
        image(mainImg, 0, 0, 600, 600);
        
    }
    else if(state == "play") {
    
        // Clear the canvas
        image(bgImg, 0, 0, width, height);
        
        // Draw the score
        text("Score: " + score, 25, 25);

        // Draw the player image
        image(pImg, pImg.x, pImg.y, pImg.w, pImg.h);

        // Update the bullets
        updateBullets();

        // Draw the walls
        drawWalls();

        // Update the enemies
        updateEnemies();

        // Check key presses
        if (keyIsDown(RIGHT_ARROW)) {
            
            // Move to the right by player movement speed
            pImg.x += pSpeed;
            
            // Keep Trump on screen
            if (pImg.x + pImg.w > width + 10) {
                
                pImg.x = width + 10 - pImg.w;
                
            }
            
        }
        if(keyIsDown(LEFT_ARROW)) {
            
            // Move to the left by player movement speed
            pImg.x -= pSpeed;
            
            // Keep Trump on screen
            if (pImg.x < - 10) {
                
                pImg.x = -10;
                
            }
        }
        
        // Check for player win or fail
        if (wall.length == 0) {
            state = "destroy";
        }
        if (enemies.length == 0) {
            state = "win";
        }
        if (reachedWall()) {
            state = "die";
        }
        
    }
    else {
        
        if (state == "die") {
        
            // Draw the main menu image
            image(dieImg, 0, 0, 600, 600);

        }
        if (state == "win") {

            // Draw the main menu image
            image(winImg, 0, 0, 600, 600);

        }
        if (state == "destroy") {

            // Draw the main menu image
            image(destroyImg, 0, 0, 600, 600);

        }
        
        // Show the score
        text("You scored: " + score, 250, 200);
        
    }
}

// On key press
function keyPressed() {
    
    // Check the key
    if (keyCode == SPACE) {
        
        // If playing
        if (state == "play") {
        
            // Check if there are less than 3 bullets
            if (bullets.length < 1) {

                // Fire a bullet
                bullets.push({x:pImg.x + (pImg.w / 2), y:pImg.y});
                
            }
        }
        
        else if (state == "main") {
            
            state = "play";
            
        }
        
        else {
            
            // Play the game
            setup();
            
        }
        
    }
    
}

// Create a function to check whether an enemy has reached the wall
function reachedWall() {
    
    // Look at each piece of wall and each enemy
    for (var i = wall.length - 1; i > -1; i--) {
        for (var j = enemies.length - 1; j > -1; j--) {
            
            // Check for collision
            if (rectCollision(wall[i].x, wall[i].y, wImg.w, wImg.h, enemies[j].x, enemies[j].y, eImg.w, eImg.h)) {
                
                return true;
                
            }
            
        }
    }
    
    return false;
    
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
                
                // Remove the wall and the bullet
                bullets.splice(i,1);
                wall.splice(j,1);
                bCollide = true;
                score -= 2;
                break;
                
            }
            
        }
        
        // Check if the bullet has been deleted and if so, skip this bullet
        if (bCollide) {
            continue;
        }
        
        // Check if the bullet has hit any enemy
        for (var j = enemies.length - 1; j > -1; j--) {
            
            // Check for a collision between the bullet and enemy
            if (rectCollision(bullets[i].x, bullets[i].y, bImg.w, bImg.h, enemies[j].x, enemies[j].y, eImg.w, eImg.h)) {
                
                // Remove the wall and the bullet
                bullets.splice(i,1);
                enemies.splice(j,1);
                bCollide = true;
                score += 1;
                
                // Check if enemy speed needs increasing
                if(score % 5 == 0) {
                    if (enemySpeed > 0) {
                        enemySpeed += 1;
                    }
                    else {
                        enemySpeed -= 0.2;
                    }
                }
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

// Function to draw each enemy
function updateEnemies() {
    
    // Set the left and right most bullet locations to the opposite side (left to right and right to left)
    currentLeft = width;
    currentRight = 0;
    
    // Look at each enemy
    for (var i = enemies.length - 1; i > -1; i--) {
        
        // Move the enemy
        enemies[i].x += enemySpeed;
        
        // Check whether they need to move down
        if (switchedDirection) {
            enemies[i].y += 2;
        }
        
        // Draw the enemy
        image(eImg, enemies[i].x, enemies[i].y, eImg.w, eImg.h);
        
        // If the x is less than the current lowest x, update it
        if(enemies[i].x < currentLeft) {
            currentLeft = enemies[i].x;
        }

        // If the x is more than the current highest x, update it
        if(enemies[i].x > currentRight) {
            currentRight = enemies[i].x;
        }
        
    }
    
    // Reset the direction switch flag
    switchedDirection = false;
    
    // Check whether the enemy direction needs to switch
    if (currentLeft < 25 || currentRight + eImg.w > width - 25) {
        
        // Switch direction
        enemySpeed = enemySpeed *= -1;
        
        // Set direction switched to true
        switchedDirection = true;
        
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

// Function to generate all of the enemies
function generateEnemies() {
    
    // Set the number of enemies on the x and y
    var ex = 11;
    var ey = 5;
    
    // Set the base x and y of the enemies
    var base = 25;
    
    // Set the gap between enemies
    var gap = 10;
    
    // Iteratively generate the enemies
    for (var i = 0; i < ex; i++) {
        for (var j = 0; j < ey; j++) {
            
            // Add the enemy
            enemies.push({x:base + (i * gap) + (i * eImg.w), y:base + (j * gap) + (j * eImg.h)});
            
        }
    }
}

// Function to check for a rect collision
function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    
    // Check whether there is a collision on the x and y
    return Math.abs((x1 + w1 / 2) - (x2 + w2 / 2)) < w1 / 2 + w2 / 2 && Math.abs((y1 + h1 / 2) - (y2 + h2 / 2)) < h1 / 2 + h2 / 2;
    
}