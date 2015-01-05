/* echo("\033[1@", true); */
var keypress  = require("keypress"),
    colors    = require('colors'),
    fs        = require('fs');
    argsParser = require('./argsParser');

    settings  = require('../../settings.json'),
    name      = settings.general.name,
    ver       = settings.general.version,
    promptVal = name.bold+" "+ver.bold+" > ".green,
    commands  = [],
    history   = [],
    currentPrev = 0;

var child, buffer, currentChar;

module.exports.init = function(io) {
    var sockets = io.sockets.sockets;
    keypress(process.stdin);  // make `process.stdin` begin emitting "keypress" events

    // Load in commands
    loadCommands();
    
    // listen for the "keypress" event
    process.stdin.on("keypress", function (ch, key) {
        // Enter
        if (key && key.name == "return") {
            if (buffer == "!!") {
                buffer = history[history.length-1];
            } else if (buffer.trim() == "") {
                prompt(true);
                return;
            }
            // Add to history
            history.push(buffer);

            executeCmd(buffer, function(lineBreak) {
                prompt(lineBreak == false ? false : true);
            });
        // Backspace
        } else if (key && key.name == "backspace") {       
            // This segment will be affected one left/right arrow keys are implemented 
            if (currentChar > 0) {
                // If user is at start of term window and needs to go to the previous line
                echo("\033[1D", true);
                echo(' ', true);
                echo("\033[1D", true);
                currentChar--;
                buffer = buffer.substring(0, buffer.length-1);
            } else {
                bell();
                return;
            }
        // Control C
        } else if (key && key.sequence == "\u0003") {
            prompt(true);
        // Special char ![A-Za-z0-9]. key is undefined and you have to use ch in this case.
        } else if (!key && ch) {
            acceptChar(ch);
        // Disable right and left arrows (for now)
        } else if (key.name == "right" || key.name == "left") {
            return;
        // Get the latest history
        } else if (key.name == "up") {
            if (history.length-currentPrev > 0) {
                prevCmd = history[history.length-currentPrev-1];
                // Moves cursor to beginning of line
                echo("\033[1G", true);
                // Clear from cursor to end of line
                echo("\033[0K", true);
                // Echo previous cmd
                echo(promptVal, true);
                echo(prevCmd, true);

                // Update buffer to previous cmd
                buffer = prevCmd;
                currentChar = buffer.length;
                currentPrev++;
            } else {
                bell();
                return;
            }
        // Go forward a command if currentPrev is within range
        } else if (key.name == "down") {
            if (currentPrev >= 1) {
                // Make it a blank terminal if the currentPrev is 1
                if (currentPrev == 1) {
                    prevCmd = "";
                } else {
                    prevCmd = history[history.length-currentPrev+1];
                }
                // Moves cursor to beginning of line
                echo("\033[1G", true);
                // Clear from cursor to end of line
                echo("\033[0K", true);
                // Echo previous cmd
                echo(promptVal, true);
                echo(prevCmd, true);

                // Update buffer to previous cmd
                buffer = prevCmd;
                currentChar = buffer.length;
                currentPrev--;
            } else {
                bell();
                return;
            }
        // Auto completion
        } else if (key.name == "tab") {
            matches = [];
            var reg;
            var tmpstr = "";
            commands.forEach(function(command) {
                reg = new RegExp("^"+buffer);
                if (reg.test(command) == true) {
                    matches.push(command);
                };
            });
            // 1 match so insert
            if (matches.length == 1) {
                var cmd = matches[0] + " ";
                // Move cursor back to beginning of prompt
                echo("\033["+buffer.length+"D", true);
                echo(cmd, true);

                // Update buffer to previous cmd
                buffer = cmd;
                currentChar = cmd.length;
            // Display matches to choose from
            } else if (matches.length > 1) {
                matches.forEach(function(val) {
                    tmpstr += val + ", ";
                });
                echo(tmpstr.substr(0, tmpstr.length-2));
            } else {
                bell();
                return;
            }
        // Have to use other chars in this case.
        } else {
            if (key.ctrl == false) {
                acceptChar(key.sequence);
            }
        }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    prompt(false);

    function prompt(newline) {
        buffer = "";
        currentChar = 0;
        currentPrev = 0;
        if (newline == true) {
            echo('\n', true);
        }
        echo(promptVal, true);
    }

    function executeCmd(buffer, callback) {
        args = argsParser(buffer);
        if (args == null) {
            typeof callback === 'function' && callback(retval);
            return;
        }
        if (commands.indexOf(args[0]) < 0) {
            echo("\n"+args[0]+": command not found", true);
        } else {

            // Run command module
            var retval = require("./cmds/"+args[0])(args, sockets, callback);
        }
        if (args[0] != "uptime") {
            typeof callback === 'function' && callback(retval);
        }
    }

    function quit() {
        echo('\nStopping server...\n', true);
        process.exit(1);
    }

    function acceptChar(ch) {
        var reg = new RegExp(/\S| /);
        if (reg.test(ch) != true) {
            return;
        }

        // Add to buffer
        buffer += ch;

        // Output character
        echo(ch, true);

        // Increase character count
        currentChar++;
    }

    function bell() {
        echo('\u0007', true);
    }

    function listUsers() {
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
        })
    }

    function loadCommands() {
        cmds = fs.readdirSync("console/cmds");
        cmds.forEach(function(val) {
            commands.push(val.substr(0, val.length-3));
        });
    }
}

var echo = function(txt, special) {
    special = typeof special !== 'undefined' ? special : false;
    // If it isn't an echo from the console, then show line and fix stdin buffer
    if (!special) {
        // Moves cursor to beginning of line
        echo("\033[1G", true);
        // Clear from cursor to end of line
        echo("\033[0K", true);
        // Echo text
        echo(txt+"\n", true);
        // Put buffer back
        echo(promptVal, true);
        echo(buffer, true);
    } else {
        process.stdout.write(txt);
    }
};

module.exports.log = echo;
