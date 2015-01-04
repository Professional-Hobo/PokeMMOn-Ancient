var keypress = require("keypress");
var colors   = require('colors');
var os       = require('os');
var exec     = require('child_process').exec, child;
var buffer;
var currentChar;
var name = "PokeMMOn";
var ver  = "0.0.1";
var promptVal = name.bold+" "+ver.bold+" > ".green;
var history = [];
var currentPrev = 0;
var commands = ["quit", "stop", "history", "uptime", "clear", "cls"];

// var rows = process.stdout.rows;
// var cols = process.stdout.columns;
module.exports.init = function() {
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

    // listen for the "keypress" event
    process.stdin.on("keypress", function (ch, key) {
        //process.stdout.write("\033[6n");
        if (key && key.name == "return") {
            if (buffer == "!!") {
                buffer = history[history.length-1];
            }
            executeCmd(buffer, function(lineBreak) {
                prompt(lineBreak == false ? false : true);
            });
        // Backspace
        } else if (key && key.name == "backspace") {        
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
        // Control Q (quit)
        } else if (key && key.sequence == "\u0011") {
            quit();
        // Special char ![A-Za-z0-9]. key is undefined and you have to use ch in this case.
        } else if (!key && ch) {
            acceptChar(ch);
        // Disable right and left arrows (for now)
        } else if (key.name == "right" || key.name == "left") {
            return;
        // Get the latest history;
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
            }
        // Have to use other chars in this case.
        } else {
            acceptChar(key.sequence);
        }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    prompt(false);

    // process.stdout.on('resize', function() {
    //     rows = process.stdout.rows;
    //     cols = process.stdout.columns;
    // });

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
        retval = true;
        args = buffer.match(/"(.+?)"|'(.+?)'|(\S+)/g);
        if (args == null) {
            typeof callback === 'function' && callback(retval);
            return;
        }
        history.push(buffer);
        argCount = args.length;
        //console.log("\n");
        //console.log(args);
        //console.log(argCount);
        switch (args[0]) {
            case "quit":
            case "stop":
                quit();
                break;
            case "history":
                retval = false;
                console.log();
                a = 0;
                history.forEach(function (item) {
                    if (++a != history.length) {
                        console.log(a+".\t"+item);
                    }
                })
                break;
            case "uptime":
                retval = false;
                exec('uptime',
                    function (error, stdout, stderr) {
                        if (error !== null) {
                            console.log("\n"+error);
                        } else {
                            console.log("\n"+stdout.substr(1, stdout.length-2));
                        }
                        return typeof callback === 'function' && callback(retval);
                    }
                );
                return;
                break;
            case "clear":
            case "cls":
                echo("\033[2J", true);
                echo("\033[;H", true);
                break;
            default:
                echo("\n"+buffer+": command not found", true);
        }
        typeof callback === 'function' && callback(retval);
    }

    function quit() {
        echo('\nQuitting...\n', true);
        process.exit(1);
    }

    function acceptChar(char) {
        // Add to buffer
        buffer += char;

        // Output character
        echo(char, true);

        // Increase character count
        currentChar++;
    }

    function bell() {
        echo('\u0007', true);
    }

    /*
    function autoComplete(buffer) {
        array.forEach(function(item)
    }
    */
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