function Game(options) {
    this.time = new Time();
    this.dom = this.build();        // The root of the game in the DOM. When creating new elements, append to this.dom
    this.options = options;

    this.bufA = {};
    this.bufB = {};
    this.dirty = false;

    this.fps = 0;                   // Used for utility to see the current fps
    this.fpsHist = [];
    this.fpsWrap = -1;
    this.maxFrames = 100;           // The number of frames to keep track of for calculating fps

    // this.cache = // TODO Need to implement a cache for canvas

    this.start();
}

// Averages the fps of the last "maxFrames" frames
// Smoothness can be adjusted dynamically by adjusting maxFrames value
Game.prototype.calcFps = function() {
    this.fpsWrap = (this.fpsWrap + 1) % this.maxFrames;
    this.fpsHist[this.fpsWrap % this.maxFrames] = 1/this.time.deltaTime;

    // Normalize fpsHist
    while(this.fpsHist.length > this.maxFrames)
        this.fpsHist.pop();

    var totalFrames = 0;
    for(var i = this.fpsHist.length - 1; i >= 0; i--)
        totalFrames += this.fpsHist[i];

    this.fps = totalFrames/this.fpsHist.length;
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

    requestAnimationFrame(this.render.bind(this));
};

