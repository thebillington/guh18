// Variable to hold the game classes
var games;

// Set the key press handler
window.onkeyup = function(e) {
    
    // Get the key
    var key = e.keyCode ? e.keyCode : e.which;
    
    // Check if the key was enter and if the search box is focused
    if (key == 13 && document.activeElement == document.getElementById("searchTerm")) {
        search();
    }
}

// Setup function
function setup() {
    
    // Get all the game divisions
    games = document.getElementsByClassName("game");
    
}

// Function to run a search
function search() {
    
    // Get the search term
    var term = document.getElementById("searchTerm").value;
    
    // Get the error box
    var error = document.getElementById("error");
    
    // Remove error text
    error.innerHTML = "";
    
    // Set the number of shown games to 0
    shown = 0;
    
    // Check if there is an empty string
    if (term == "") {
        
        // Set all the games to display
        for (var i = 0; i < games.length; i++) {
            games[i].style.display = "inline-block";
        }
        return;
        
    }
    
    // Otherwise only show games that match the search term
    else {
        for (var i = 0; i < games.length; i++) {
            
            // Check if the game name contains the search string
            if (games[i].innerHTML.toLowerCase().includes(term.toLowerCase())) {
                
                // Make it visibile
                games[i].style.display = "inline-block";
                
                //
                shown++;
                
            }
            
            // Otherwise don't show it
            else {
                
                games[i].style.display = "none";
                
            }
            
        }
    }  
    
    // Check if nothing was shown
    if (shown == 0) {
        
        // Output an error
        error.innerHTML = "<p>No results were found for your search...</p>";
        
    }
}