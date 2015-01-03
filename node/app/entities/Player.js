/*
 * Each player in the game is represented with a player object.
 * @inventory is an Inventory object
 * @settings is a Settings object
 */
function Player(username, gender, zone, x, y, inventory, party, PC, pokedex, pokenav, card, settings) {
    this.username = username;       // Player display name. Unique identifier
    this.gender = gender;
    this.pos = {            // Player positional data within the world
        'zone': zone,
        'x': x,
        'y': y
    };
    this.inventory = inventory;      // Player inventory
    this.party = [];        // Current Pokemon the player has with them. The limit is 6.
    this.PC = {};           // The PC of the player
    this.pokedex = {};
    this.pokenav = {};
    this.card = {};         // Trainer Card - Used to keep track of player gym badges
    this.settings = settings;     // Options editable by player such as text speed, battle scene options, sound, etc.
}


exports = module.exports = new Player(username, gender, zone, x, y, inventory, party, PC, pokedex, pokenav, card, settings);
