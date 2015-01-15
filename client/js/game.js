(function() {
    function Game(options) {
        this.time = new Time();
        this.dom = this.build();
        this.fps = 0;                   // Used for utility to see the current fps
        this.options = options;

        this.bufA = {};
        this.bufB = {};
        this.dirty = false;

        // this.cache = // TODO Need to implement a cache for canvas
        // TODO Need to implement delta time

        this.start();
    }

    // Averages the fps of the two most recent frames. TODO This is definitely not smooth enough in scaling.
    Game.prototype.calcFps = function() {
        this.fps = (1000/this.time.deltaTime + this.fps)/2;
    };

    // Create the root from which game elements will be created and removed
    Game.prototype.build = function() {
        var div = document.createElement("div");

        div.setAttribute("class", "game");
        document.body.appendChild(div);

        return div;
    };

    // Connects the game to the server and starts the update and render loops
    Game.prototype.start = function() {
        this.connect(); // Connects to the server

        this.logic();   // Sets up game logic
        this.render();  // Has an animation loop
    };

    Game.prototype.connect = function() {
        this.socket = io(this.options.server);
    }

    // Set up event based game logic here
    // this.dirty is set to false within these socket events
    Game.prototype.logic = function() {
/*        this.socket.on('', function(data) {});
        this.socket.on('', function(data) {});
        this.socket.on('', function(data) {});
        this.socket.on('', function(data) {});

        // Example of how an update event would look like
        // Nothing in this example should be changed except for the 
        // event that the socket is waiting on and the arguments of the handler
        // Also the comment in the middle of the handler should be replaced with 
        // update code
        this.socket.on('', function(data) {
            if(!dirty) {
                this.bufB = {};
                dirty = true;
            }

            // Store all information inside of this.bufB
        });
*/

        // TODO Keybindings and mouseevents need to be tied with this.socket.emit
    };

    // Game rendering loop
    Game.prototype.render = function() {
        this.time.calc();       // Calculates deltaTime. Can check this.time.deltaTime after this is called
        this.calcFps();         // Calculates the fps for utility.

        if(this.dirty) {
            this.bufA = this.bufB;  // Moves updates from bufB to bufA
            this.dirty = false;
        }

        // TODO Rendering stuff goes here. All update data will be found in this.bufA
        // Access delta time though this.time.deltaTime
        // Do not put anything else anywhere else in this function except for where this comment is.

        requestAnimationFrame(this.render);
    };

    window.Game = Game;
}())
