module.exports = function(args, sockets, callback) {
    var echo  = require("../console").log;
    var colors = require('colors');
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
};
