var db           = require('./util/db'),
    EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    fs           = require('fs');

var Player, Zone, events, zones;

/*
 * The heart of the game backend. Contains the world representation and performs
 * all operations on the world. Will handle settings up multiple channels when 
 * channel support is added in.
 */
exports.start = function start() { 
    Player  = require('./entities/Player'),
    Zone    = require('./entities/Zone');

    players = {};
    zones = {};
    events = new EventEmitter();

    // Load all zones automatically from the maps directory
    fs.readdirSync('app/maps/').forEach(function(name) {
        zones[name] = new Zone(name);
    });
};

exports.e = function getEmitter() {
    return events;
};


exports.startZone = require('./newGame');

exports.getZone = function getZone(name) {
    return zones[name];
}

/*
 * Called whenever a player logs in to the game. Add player to global array of logged in players.
 * 
 * @username The username of the player to be loaded in
 */
exports.loadPlayer = function loadPlayer(username, socket) {
    if(!players[username]) {
        var newPlayer;

        db.queryDB.query('SELECT * FROM player WHERE username = ?', [username], function(err, results) {
            if(err) return err;

            newPlayer = new Player({
                'username': username
                // results[] Parse results and put them here
            });
        });

        players[username] = newPlayer;
    }
}

/*
 * Called whenever a player logs out/leaves the game. Saves player data to the server and 
 * remove player from players array
 *
 * @username The username of the player to be unloaded
 */
exports.unloadPlayer = function unloadPlayer(username) {
    // delete player from player list
    // save player to database

    var saveThis = playerList[username];
    delete playerList[username];
    
    //db.queryDB.query('save player data to database');
}

