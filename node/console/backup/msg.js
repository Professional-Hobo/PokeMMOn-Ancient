module.exports = function(args, sockets, callback) {
    var colors = require('colors');
    var user = args[1];
    var val = args[2];
    if (typeof sockets[user-1] === 'undefined') {
        console.log(); console.log("index " + user + " out of bounds.");
        return false;
    }
    // Get user's socket object
    user = sockets[user-1];
    user.emit("msg", val);
    console.log(); console.log("Message sent!");
    return false;
};
