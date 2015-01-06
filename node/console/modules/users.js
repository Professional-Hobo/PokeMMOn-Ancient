var colors = require('colors');
//var echo  = require("../console").log;

// Keypress events for this module here
exports.keypress = function(ch, key) {}

// TODO Called on autocomplete for a command in this module
exports.autocomplete = function(cmd, data) {
    if(!data)
        exports.commands[cmd].format();   // Somewhere in man, format should be called
    /*else {

    }*/
}

// Called by man module
exports.man = function(cmd) {
    exports.commands[cmd].format();   // Somewhere in man, format should be called
}

// Command functions
function kick(args, sockets, callback) {
    var user = args[1];
    
    if (typeof sockets[user-1] === 'undefined') {
        console.log(); 
        console.log("index " + user + " out of bounds.");
        return false;
    }

    user = sockets[user-1];     // Get user's socket object
    user.disconnect();          // Disconnect user from server

    // Remove user from users array
    name = typeof user.session === 'undefined' ? "Guest" : user.session.username;
    sockets.splice(user-1, 1);
    console.log();
    console.log("[user]".grey+" "+name+" has disconnected from "+user.ip);
    return false;

}

function msg(args, sockets, callback) {
    var user = args[1];
    var val = args[2];
    if (typeof sockets[user-1] === 'undefined') {
        console.log(); 
        console.log("index " + user + " out of bounds.");
        return false;
    }

    user = sockets[user-1];         // Get user's socket object
    user.emit("msg", val);
    console.log(); 
    console.log("Message sent!");
    return false;
}

function users(args, sockets, callback) {
    console.log();
    if (sockets.length == 0) {
        console.log("No users connected.");
    }
    var a = 0;
    sockets.forEach(function(user) {
        if (typeof user.session === 'undefined') {
            console.log(++a+".\t"+"["+"guest".green+"]"+"\t"+user.ip);
        } else {
            console.log(++a+".\t"+"["+"user".red+"]"+"\t"+user.ip+"\t"+user.session.username.yellow);
        }
    });
    return false;
}

// TODO Format functions
kick.format = function() {};
msg.format = function() {};
users.format = function() {};

// Should have all commands that exist in this module and their respective functions
exports.commands = {
    'kick': kick,
    'msg': msg,
    'users': users
};
