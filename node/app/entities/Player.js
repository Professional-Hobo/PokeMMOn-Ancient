var Card =      require('./Card');
    Inventory = require('./Inventory'),
    Pc =        require('./Pc'),
    Pokedex =   require('./Pokedex'),
    Pokenav =   require('./Pokenav'),
    Settings =  require('./settings'),
    World =     require('./engine.js');

/*
 * Each player in the game is represented with a player object.
 * @inventory is an Inventory object
 * @settings is a Settings object
 */
function Player(username, gender, zone, x, y, inventory, party, PC, pokedex, pokenav, card, settings) {

        if(username)
            this.username = username;       // Player display name. Unique identifier
        else
            throw new Error('Username is required to create a player!');

        if(gender)
            this.gender = gender;
        else
            this.gender = default.gender;

        if(pos)
            this.pos = {                    // Player positional data within the world
                'zone': zone,
                'x': x,
                'y': y
            };
        else
            this.pos = default.pos;

        /*
        if(inventory)
            this.inventory = inventory;     // Player inventory
        else
            this.inventory = default.inventory;    

        if(party)
            this.party = [];                // Current Pokemon the player has with them. The limit is 6.
        else
            this.party = default.party;              

        if(PC)
            this.PC = {};                   // The PC of the player
        else
            this.PC = default.PC;                

        if(pokedex)
            this.pokedex = {};
        else
            this.pokedex = default.pokedex;

        if(pokenav)
            this.pokenav = {};
        else
            this.pokenav = default.pokenav;

        if(card)
            this.card = card;                 // Trainer Card - Used to keep track of player gym badges
        else
            this.card = default.card;  

        if(settings)
            this.settings = settings;       // Options editable by player such as text speed, battle scene options, sound, etc.
        else
            this.settings = default.settings;
        */
}

/*
 * All public functions for Player objects
 */
Player.prototype = {
    // Fill this with getter and setter methods for object variables
};

/*
 * Default settings for a Player object to have
 */
Player.prototype.default = {
    gender: "male";
    pos: {
        'zone': get starting zone object from world, do not create new zone here,
        'x': starting position,
        'y': starting position
       
    };
    /*
    inventory: new Inventory();    
    party: [];              
    PC: new PC();                
    pokedex: new Pokedex();
    pokenav: new Pokenav();
    card: new Card();  
    settings: new Settings();
    */
};


//exports = module.exports = new Player(username, gender, zone, x, y, inventory, party, PC, pokedex, pokenav, card, settings);
exports = module.exports = Player;

