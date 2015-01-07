var colors      = require('colors');
var reqs        = require('../console').reqs;
var echo        = require('../console').echo;
var bell        = require('../console').bell;
var promptVal   = require('../console').promptVal;
var sockets     = reqs.sockets;
var usernames   = reqs.sockets;
var currentChar = require('../console').currenChar;
var setBuffer   = require('../console').setBuffer;
var Table       = require('cli-table');

// Called by man module
exports.man = function(cmd) {
    exports.commands[cmd].man();
    exports.commands[cmd].format();   // Somewhere in man, format should be called
}

// Command functions
function kick(args, callback) {
    var data   = args[1];
    var type   = "user";

    if (data.charAt(0) == "#")
        type = "conn";
    else if (data.charAt(0) == "@")
        type = "ip";

    if (type != "user")
        data = data.slice(1);

    echo('\n', true);

    var disconnect = [];

    sockets.forEach(function (socket) {
        switch (type) {
            case "conn":
                if (data == socket.conn.id)
                    disconnect.push(socket);
                break;
            case "ip":
                if (data == socket.ip)
                    disconnect.push(socket);
                break;
            case "user":
            default:
                if (data == socket.session.username)
                    disconnect.push(socket);
        }
    });

    // This has to be in a seperate array because the sockets array gets resorted on every disconnect
    disconnect.forEach(function(socket) {
        console.log("[user]".grey+" " + socket.session.username + " has been kicked!");
        socket.disconnect(); // TODO use world.unloadPlayer(socket);
        echo("\033[1G", true);  // Moves cursor to beginning of line
        echo("\033[0K", true);  // Clear from cursor to end of line
    });

    return false;
}

function msg(args, callback) {
    var data   = args[1];
    var val    = args[2];
    var type   = "user";
    var msg    = [];

    if (data.charAt(0) == "#")
        type = "conn";
    else if (data.charAt(0) == "@")
        type = "ip";

    if (type != "user")
        data = data.slice(1);

    echo('\n', true);

    sockets.forEach(function (socket) {
        switch (type) {
            case "conn":
                if (data == socket.conn.id)
                    msg.push(socket);
                break;
            case "ip":
                if (data == socket.ip)
                    msg.push(socket);
                break;
            case "user":
            default:
                if (data == socket.session.username)
                    msg.push(socket);
        }
    });

    // This has to be in a seperate array because the sockets array gets resorted on every disconnect
    msg.forEach(function(socket) {
        socket.emit("msg", val); // TODO use world.unloadPlayer(socket);
        echo("\033[1G", true);  // Moves cursor to beginning of line
        echo("\033[0K", true);  // Clear from cursor to end of line
        console.log("Message to " + socket.session.username + " sent!");
    });

    return false;
}

function users(args, callback) {
    console.log();
    if (sockets.length == 0) {
        console.log("No users connected.");
    }

    var a = 0;
    var table = new Table({head: ['#'.white, 'User'.white, 'IP Address'.white, 'Connection ID'.white]});

    sockets.forEach(function(user) {
        if (typeof user.session === 'undefined') {
            table.push([++a, "guest".yellow, user.ip.green, ""]);
        } else {
            table.push([++a, user.session.username.yellow, user.ip.green, user.conn.id.cyan]);
        }
    });
    console.log(table.toString());
    return false;
}

function userAutoComplete(args) {

    var data = args[1],
        conns = [],
        ips   = [],
        users = [],
        pre = "";

    usernames.forEach(function(val) {
        conns.push(val.conn.id);
        ips.push(val.ip);
        users.push((val.session ? val.session.username : "Guest"));
    });

    // Make arrays unique
    conns = conns.filter(function(elem, pos) {
        return conns.indexOf(elem) == pos;
    });

    ips = ips.filter(function(elem, pos) {
        return ips.indexOf(elem) == pos;
    });

    users = users.filter(function(elem, pos) {
        return users.indexOf(elem) == pos;
    });

    // ID number
    if (data.charAt(0) == "#") {
        data = data.slice(1);
        type = conns;
        pre = "#";
    } else if (data.charAt(0) == "@") {
        data = data.slice(1);
        type = ips;
        pre = "@";
    } else {
        type = users;
    }

    var matches = [];
    var tmpstr = "";
    type.forEach(function(val) {
        var reg = new RegExp("^" + data);

        if (reg.test(val) == true)
            matches.push(val);
    });

    if (matches.length == 1) {           // 1 match so insert
        var cmd = matches[0];

        echo("\033[1G", true);           // Moves cursor to beginning of line
        echo("\033[0K", true);           // Clear from cursor to end of line
        echo(promptVal, true);           // Echo prompt
        echo(args[0] + " " + pre + cmd + " ", true); // Echo previous cmd and new
        setBuffer(args[0] + " " + pre + cmd + " ");    // Update buffer to previous cmd
    } else if (matches.length > 1) {     // Display matches to choose from
        matches.forEach(function(val) {
            tmpstr += val + ", ";
        });
        echo(tmpstr.substr(0, tmpstr.length-2));
    } else {
        bell();
        return;
    }
}

// TODO Format functions
kick.format = function() {
    echo("kick {user | #id | @ip} [msg]", false);
};

msg.format = function() {
    echo("msg {user | #id | @ip} {msg}", false);
};

kick.autocomplete = function(args) {
    userAutoComplete(args);
    // TODO arrow keys need to be implemented for "" message cursor
    // else if (args.length == 2) {
    //     msgAutocomplete(args);
    // }
};

msg.autocomplete = function(args) {
    userAutoComplete(args);
    // TODO arrow keys need to be implemented for "" message cursor
    // else if (args.length == 2) {
    //     msgAutocomplete(args);
    // }
};

// TODO Man functions


// Should have all commands that exist in this module and their respective functions
exports.commands = {
    'kick': kick,
    'msg': msg,
    'users': users
};
