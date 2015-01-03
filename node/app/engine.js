
exports = module.exports = function engine(data) {
    this.players = {}; 
    this.zones = {
        'zoneName': zoneobj
    };
    this.zoneMap = {
        'zoneName': {
            'up': zone above it,
            'right': zone to the right,
            'down': zone below this one,
            'left': zone to the left of this one
        }
    };

};

// The server will call this whenever a player logs in to the game. Add player to global array of logged in players
module.exports.loadPlayer = function loadPlayer(username) {
    // Check if player with username is already in player list
    // if player is not already in player list, load player from db
    // if player is not in db, create new player and save once to db
    // put loaded/created player in player list

    player list add(db.queryDB.query('get player by username'))

    playerList[username] = Playerobject;
}

// The server will call this whenever a player logs out/leaves the game. Save player data to the server and remove from array of logged in players
module.exports.unloadPlayer = function unloadPlayer(username) {
    // delete player from player list
    // save player to database

    var saveThis = playerList[username];
    delete playerList[username];
    
    db.queryDB.query('save player data to database');
}


