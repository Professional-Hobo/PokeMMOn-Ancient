
exports = module.exports = function engine(data) {
    this.playerList = {}; 
    this.world = require('./entities/world');
};

Things the engine needs to handle.

- Create World object. Each server will have it's own engine running with it's own world for scalability reasons
- Do I actually need a World object? Shouldn't the engine object actually do everything the world object is supposed to do?
    - What do I split between the engine object and the world object. Discuss with Keith.



// The server will call this whenever a player logs in to the game. Add player to global array of logged in players
module.exports.loadPlayer = function loadPlayer(username) {
    player list add(db.queryDB.query('get player by username'))



    playerList[username] = Playerobject;
}

// The server will call this whenever a player logs out/leaves the game. Save player data to the server and remove from array of logged in players
module.exports.unloadPlayer = function unloadPlayer(username) {

    var saveThis = playerList[username];
    delete playerList[username];
    
    db.queryDB.query('save player data to database');
}


