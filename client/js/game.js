function Game(options) {
    this.dom = this.build();        // The root of the game in the DOM. When creating new elements, append to this.dom
    this.options = options;

    this.bufA = {};                 // Used by render
    this.bufB = {};                 // Used by update/logic
    this.dirty = false;             // Used to signal when updates should be pulled from bufB to bufA

    this.oldTime;                   // Used to calculate deltaTime
    this.deltaTime;                 // In milliseconds

    this.fps = 0;                   // Used for utility to see the current fps
    this.fps_time = 0;
    this.fps_ticks = 0;
    this.fps_delta = 1000;          // The number of milliseconds to average frames over

    // this.cache = // TODO Need to implement a cache for canvas
}

// Averages the fps of the last "maxFrames" frames
// Smoothness can be adjusted dynamically by adjusting maxFrames value
// Call this every frame
Game.prototype.calcFps = function() {
    if(this.deltaTime == 0)
        return;

    this.fps_time += this.deltaTime;
    this.fps_ticks++;

    if(this.fps_time >= this.fps_delta) {
        this.fps = this.fps_ticks/this.fps_time * 1000;
        this.fps_ticks = this.fps_time = 0;
    }
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
    this.connect();                     // Connects to the server

    this.logic();                       // Sets up game logic
    requestAnimationFrame(this.render.bind(this)); // Has an animation loop
};

Game.prototype.connect = function() {
    this.socket = io(this.options.server);
}

// Set up event based game logic here
// this.dirty is set to false within these socket events
Game.prototype.logic = function() {
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


    // TODO Keybindings and mouseevents need to be tied with this.socket.emit
    // https://github.com/tzuryby/jquery.hotkeys for examples
};

// Game rendering loop
Game.prototype.render = function(time) {
    if(!this.oldTime)
        this.oldTime = time;

    this.deltaTime = Math.min(1000, time - this.oldTime);
    this.oldTime = time;

    this.calcFps();             // Calculates the fps for utility.

    if(this.dirty) {
        this.bufA = this.bufB;  // Moves updates from bufB to bufA
        this.dirty = false;
    }

    // TODO Rendering stuff goes here. All update data will be found in this.bufA
    // Access delta time though this.time.deltaTime
    // Do not put anything else anywhere else in this function except for where this comment is.

    requestAnimationFrame(this.render.bind(this));
};

