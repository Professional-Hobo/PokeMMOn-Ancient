function Player(username, gender, inventory, party, PC, pokedex, pokenav, card, settings) {
    this.username = username;       // Player display name. Unique identifier
    this.gender = gender;
    this.pos = {            // Player positional data within the world
        'zone': 
        'x': 
        'y': 
    };
    this.inventory = {      // Player inventory
        'items': [],
        'pokeballs': [],
        'tms & hms': [],
        'berries': [],
        'key items': [],
        'medicine': [],
    };
    this.party = [];        // Current Pokemon the player has with them. The limit is 6.
    this.PC = {};           // The PC of the player
    this.pokedex = {};
    this.pokenav = {};
    this.card = {};         // Trainer Card - Used to keep track of player gym badges
    this.settings = {};     // Options editable by player such as text speed, battle scene options, sound, etc.

}


exports = module.exports = new Player(username, gender, inventory, party, PC, pokedex, pokenav, card, settings);
