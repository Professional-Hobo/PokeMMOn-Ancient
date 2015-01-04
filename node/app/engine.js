var db = require('./util/db');
var Player = require('./entities/Player');
var Zone = require('./entities/Zone');

/*
 * The heart of the game backend. Contains the world representation and performs
 * all operations on the world.
 */
exports = module.exports = function engine() { 
    this.players = {};
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

/*
 * Called whenever a player logs in to the game. Add player to global array of logged in players.
 * 
 * @username The username of the player to be loaded in
 */
module.exports.loadPlayer = function loadPlayer(username) {
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
module.exports.unloadPlayer = function unloadPlayer(username) {
    // delete player from player list
    // save player to database

    var saveThis = playerList[username];
    delete playerList[username];
    
    //db.queryDB.query('save player data to database');
}


