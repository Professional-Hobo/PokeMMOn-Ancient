var /*Card =      require('./Card');
    Inventory = require('./Inventory'),
    Pc =        require('./Pc'),
    Pokedex =   require('./Pokedex'),
    Pokenav =   require('./Pokenav'),
    Settings =  require('./settings'),*/
    world =     require('../World');
console.log(world);
/*
 * fallback settings for a Player object to have
 */
var fallback = {
    gender: "male",
    pos: Player.genPos(world.startZone.zone, world.startZone.x, world.startZone.y)
    /*
    inventory: new Inventory(),    
    party: [],              
    PC: new PC(),                
    pokedex: new Pokedex(),
    pokenav: new Pokenav(),
    card: new Card(),  
    settings: new Settings()
    */
};

//exports = module.exports = new Player(username, gender, zone, x, y, inventory, party, PC, pokedex, pokenav, card, settings);
exports = module.exports = Player;

/*
 * Each player in the game is represented with a player object.
 *
 * @options An object containing all the various options necessary for a Player object
 *      - username field is required
 */
function Player(options) {
        if(options.username)
            this.username = options.username;       // Player display name. Unique identifier
        else
            throw new Error('Username is required to create a player!');

        this.gender = options.gender ? options.gender : fallback.gender;
        this.pos = options.pos ? options.pos : fallback.pos;             // Player positional data within the world

/*
        this.inventory = options.inventory ? options.inventory : fallback.inventory; // Player inventory
        
        // Pokemon player is currently carrying. Current limit is 6.
        this.party = new Party(options.party ? options.party : fallback.party);  

        // Player's PC. Where all there not in use items and pokemon go.
        this.PC = new PC(options.PC ? options.PC : fallback.PC);                 
        
        this.pokedex = new Pokedex(options.pokedex ? options.pokedex : fallback.pokedex);
        this.pokenav = new Pokenav(options.pokenav ? options.pokenav : fallback.pokenav);

        // Trainer Card - Used to keep track of player gym badges
        this.card = new Card(options.card ? options.card : fallback.card);

        // Options editable by player such as text speed, battle scene options, sound, etc.
        this.settings = options.settings ? options.settings : fallback.settings;
*/
}

/*
 * Utility function for areas where Player objects are created.
 */
Player.prototype.genPos = function genPos(zone, x, y) {
    return {
        'zone': zone,
        'x': x,
        'y': y
    };
}

