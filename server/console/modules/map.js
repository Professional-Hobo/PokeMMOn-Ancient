var colors      = require('colors');
var exec        = require('child_process').exec;
var fs          = require('fs');
var Table       = require('cli-table');
var echo        = require('../console').echo;
var bell        = require('../console').bell;
var promptVal   = require('../console').promptVal;
var setBuffer   = require('../console').setBuffer;

// Called by man module
exports.man = function(cmd) {
    exports.commands[cmd].man();
    exports.commands[cmd].format();   // Somewhere in man, format should be called
}

function mapAutoComplete(args) {
    var data = args[1];
    var matches = [];
    var maps = [];
    var tmpstr = "";

    fs.readdirSync("tools/genmap/maps").forEach(function(val) {
        if (val.charAt(0) == ".")
            return;

        maps.push(val.slice(0, val.length-4));
    });


    maps.forEach(function(val) {
        var reg = new RegExp("^" + data);

        if (reg.test(val) == true)
            matches.push(val);
    });

    if (matches.length == 1) {           // 1 match so insert
        var cmd = matches[0];

        echo("\033[1G", true);           // Moves cursor to beginning of line
        echo("\033[0K", true);           // Clear from cursor to end of line
        echo(promptVal, true);           // Echo prompt
        echo(args[0] + " " + cmd + " ", true); // Echo previous cmd and new
        setBuffer(args[0] + " " + cmd + " ");    // Update buffer to previous cmd
    } else if (matches.length > 1) {     // Display matches to choose from
        matches.forEach(function(val) {
            tmpstr += val + ", ";
        });
        echo(tmpstr.slice(0, tmpstr.length-2));  // Echo ambiguous matches

        // Get longest string
        longest = matches.sort(function (a, b) { return b.length - a.length; })[0];
        compare = matches.sort(function (a, b) { return b.length - a.length; })[1];
        var a = 0;
        var partial = "";
        while (longest[a] == compare[a] && a < longest.length) {
            partial += longest[a++];
        };

        echo("\033[1G", true);           // Moves cursor to beginning of line
        echo("\033[0K", true);           // Clear from cursor to end of line
        echo(promptVal, true);           // Echo prompt
        echo(args[0] + " " + partial, true); // Echo previous cmd and new
        setBuffer(args[0] + " " + partial);    // Update buffer to previous cmd
    } else {
        bell();
        return;
    }
    return {retval: false, external: false};
}

// Command functions
function genmap(args, callback) {
    echo("\n", true);
    exec('php tools/genmap/genmap.php ' + args[1],
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log(error);
            } else {
                console.log(stdout);
            }
            return typeof callback === 'function' && callback(false);
        }
    );
    return {retval: false, external: true};
}

// TODO Format functions
genmap.format = function() {
    echo("genmap {map_name}", false);
};

genmap.autocomplete = function(args) {
    mapAutoComplete(args);
};

// TODO Man functions

// Should have all commands that exist in this module and their respective functions
exports.commands = {
    'genmap': genmap
};
