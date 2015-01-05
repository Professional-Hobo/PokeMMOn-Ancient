module.exports = function(args, sockets, callback) {
    var colors = require('colors');
    var user = args[1];
    if (typeof sockets[user-1] === 'undefined') {
        console.log(); console.log("index " + user + " out of bounds.");
        return false;
    }
    // Get user's socket object
    user = sockets[user-1];
    // Disconnect user from server
    user.disconnect();
    // Remove user from users array
    name = typeof user.session === 'undefined' ? "Guest" : user.session.username;
    sockets.splice(user-1, 1);
    console.log();
    console.log("[user]".grey+" "+name+" has disconnected from "+user.ip);
    return false;
};
