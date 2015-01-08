/*
 *  
 */
function Zone(map) {
    this.map = ;            // map that has walkable, non-walkable, and warp areas
    this.img = ;            // The name of the generated base image for the map. Don't know if this needs to be here
    this.entities = [];     // A list of all entities on this map.
}

/*

- Going to need to objects to represent the map
    - First object represents the map itself, including all walkable, non-walkable, and warp zones
        - Might also have to represent all the other types of tiles, such as tree tiles, water tiles, etc.
    - Second object represents all entities on the map.
        - This second object is going to have an object for each grid cell of the map (A list of all players/npc's on that grid cell)
        - This second object is going to essentially be a 3D array

*/

// Possible move function signature. May need to change
Zone.prototype.move(entity, x, y) {

}

exports = module.exports = Zone;
