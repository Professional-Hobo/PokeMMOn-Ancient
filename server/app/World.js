var db           = require('./util/db'),
    EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    fs           = require('fs');

var Player, Zone, events, zones, open, update;

/*
 * Initializes the World so that it's ready to be started.
 * Only needs to be called once and the server can be
 * be shutdown and then started over and over again.
 */
exports.init = function init() {
    Player = require('./entities/Player'),
    Zone   = require('./entities/Zone');
    events = new EventEmitter();
}

/*
 * The heart of the game backend. Contains the world representation and performs
 * all operations on the world. Will handle settings up multiple channels when 
 * channel support is added in.
 */
exports.start = function start() { 
    open = true;
    players = {};
    zones = {};

    // Load all zones automatically from the maps directory
    fs.readdirSync('app/maps/').forEach(function(name) {
        zones[name] = new Zone(name);
    });

    // Have each zone push updates ~3 times a second
    update = setInterval(function() {
        Object.keys(zones).forEach(function(key) {
            zones[key].update();
        });
    }, 333);
};

/*
 * EventEmitter for the World
 */
exports.e = function getEmitter() {
    return events;
};

/*
 * Starting Zone information for new players
 */
exports.startZone = require('./newGame');

/*
 * Utility function to get a zone object
 */
exports.getZone = function getZone(name) {
    return zones[name];
}

/*
 * Private Helper function. Used by the saveAll and unloadPlayer functions
 * to remove redundant player save code
 */
function save(name) {
    // TODO Save players[player] informatino to database
    // db.queryDB.query('save player data to database');
}

/*
 * Saves the state of each player on the server. Good to call every hour or
 * so in case of a server crash.
 */
exports.saveAll = function saveAll() {
    Object.keys(players).forEach(function(player) {
        save(player);
    });
}

/*
 * Stops loading in players, saves all current player states, and then
 * unloads all players from the game.
 */
exports.shutdown = function shutdown() {
    open = false;
    clearInterval(update);

    Object.keys(players).forEach(function(player) {
        exports.unloadPlayer(player);
    });
}

/*
 * Called whenever a player logs in to the game. Add player to global array of logged in players.
 * 
 * @username The username of the player to be loaded in
 */
exports.loadPlayer = function loadPlayer(username, socket, callback) {
    if(!players[username] && open) {
        var newPlayer;

        db.queryDB.query('SELECT * FROM player WHERE username = ?', [username], function(err, results) {
            if(err) return err;

            newPlayer = new Player({
                'socket': socket,
                'username': username
                // results[] Parse results and put them here
            });
        });

        players[username] = newPlayer;
    }

    if(typeof callback == "function")
        callback();
}

/*
 * Called whenever a player logs out/leaves the game. Saves player data to the server and 
 * remove player from players array
 *
 * @username The username of the player to be unloaded
 */
exports.unloadPlayer = function unloadPlayer(username, callback) {
    save(username);
    delete playerList[username];

    if(typeof callback == "function")
        callback();
}

