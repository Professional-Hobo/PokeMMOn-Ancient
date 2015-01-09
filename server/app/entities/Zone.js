var EventEmitter = require('events').EventEmitter,
    util         = require('util'),
//    Npc          = require('./Npc'),
    Player       = require('./Player');

util.inherit(Zone, EventEmitter);
exports = module.exports = Zone;

/*
 *  
 */
function Zone(name) {
    EventEmitter.call(this);            // Set up as an event emitter

    this.name = name;

    var map = [];                                                   // map that has walkable, non-walkable, and warp areas];           
    var mapping = require('./maps/' + name + '/mapping.json');      // Zone mappings (left, down, up, right);
    var entities = [];                                              // All entities on this map.

    // Initializes the map so that everything is walkable
    var dim = require('./maps/' + name + '/dim.json');              // The dimensions of this map
    for(var y = 0; y < dim.height; y++) {
        map[y] = [];
        for(var x = 0; x < dim.width; x++)
            map[y][x] = [{'type': 'walkable'}];
    }

    // Load in boundaries (non-walkable areas)
    require('./maps/' + name + '/boundaries.json').forEach(function(bound) {
        map[bound.y][bound.x][0].type = 'boundary';
    });

    // Load in warp zones
    require('./maps/' + name + '/warps.json').forEach(function(warp) {
        warp.type = "warp";
        map[warp.src_coords.y][warp.src_coords.x][0] = warp;
    });

    // Load in zone events
    require('./maps/' + name + '/events.json').forEach(function(zoneEvent) {
        zoneEvent.type = "event";
        map[zoneEvent.coords.y][zoneEvent.coords.x].push(zoneEvent);
    });

    // TODO Load in all NPCs
    //require('./maps' + name + '/NPCs.json').forEach(function(npc) {
        
    //});
}

Zone.prototype.action = function action(entity, x, y) {

}

// Possible move function signature. May need to change
Zone.prototype.move = function move(entity, x, y) {
/*    if(entity.x and entity.y => x and y is a legal move and x and y is walkable in the map) {

    } else {
        // Attempted an illegal move. Potential ban stuff here
    }*/
}

