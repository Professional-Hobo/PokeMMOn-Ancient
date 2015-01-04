var db = require('./util/db');
var Player = require('./entities/Player');
var Zone = require('./entities/Zone');

/*
 * The heart of the game backend. Contains the world representation and performs
 * all operations on the world. Will handle settings up multiple channels when 
 * channel support is added in.
 */
function World() { 
    this.players = {};
    this.start_zone = 'test_town';
    this.zones = {
        'test_town': new Zone();
    };
    this.zoneMap = {
        'zoneName': {
            'up': zone above it,
            'down': zone below this one,
            'left': zone to the left of this one
            'right': zone to the right,
        }
    };
};

World.startZone() {
    return zones[start_zone];
}

/*
 * Called whenever a player logs in to the game. Add player to global array of logged in players.
 * 
 * @username The username of the player to be loaded in
 */
World.loadPlayer = function loadPlayer(username) {
    if(!players[username]) {
        var newPlayer;

        db.queryDB.query('SELECT * FROM player WHERE username = ?', [username], function(err, results) {
            if(err) return err;
            newPlayer = new Player(results[], results[], results[], results[]);
        });

        if(!newPlayer)
            newPlayer = new Player(Player.default);

        players[username] = newPlayer;
    }
}

/*
 * Called whenever a player logs out/leaves the game. Saves player data to the server and 
 * remove player from players array
 * @username The username of the player to be unloaded
 */
World.unloadPlayer = function unloadPlayer(username) {
    // delete player from player list
    // save player to database

    var saveThis = playerList[username];
    delete playerList[username];
    
    //db.queryDB.query('save player data to database');
}

module.exports = new World();
