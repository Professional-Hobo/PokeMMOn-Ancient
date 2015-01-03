/*
 * The heart of the game backend. Contains the world representation and performs
 * all operations on the world.
 */
exports = module.exports = function engine() { 
    this.players = {};
    this.zones = {
        'zoneName': zoneobj
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
 * @username The username of the player to be loaded in
 */
module.exports.loadPlayer = function loadPlayer(username) {
    if(!players[username]) {
        // Load player
        var newPlayer = db.queryDB.query('get player by username');
        if(!newPlayer)
            newPlayer = new Player();

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
    
    db.queryDB.query('save player data to database');
}


