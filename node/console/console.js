/* echo("\033[1@", true); */
var keypress  = require("keypress"),
    colors    = require('colors'),
    fs        = require('fs'),
    settings  = require('../../settings.json'),
    name      = settings.general.name,
    ver       = settings.general.version,
    promptVal = name.bold+" "+ver.bold+" > ".green,
    history = [],
    currentPrev = 0,
    modules = [],
    commands  = {
        'quit': quit,
        'stop': quit,
        'exit': quit,
        'history': printHistory,
        'clear': clear
    };

var child, buffer, currentChar;

exports.init = function init(reqs) {
    reqs['buffer'] = buffer;    // Done so that modules can access the buffer
    exports.reqs = reqs;
};

exports.start = function start() {
    keypress(process.stdin);    // make `process.stdin` begin emitting "keypress" events

    load();                     // Load in modules and commands
    
    // listen for the "keypress" event
    process.stdin.on("keypress", function (ch, key) {
        modules.forEach(function(module) {
            if(module.keypress)
                module.keypress(ch, key);
        });

        if (key && key.name == "return")                    // Enter
            onEnter();
        else if (key && key.name == "backspace")            // Backspace
            backspace();
        else if (key && key.sequence == "\u0003")           // Control C
            prompt(true);
        else if (!key && ch)                                // Special char ![A-Za-z0-9]. key is undefined and you have to use ch in this case.
            acceptChar(ch);
        else if (key.name == "right" || key.name == "left") // Disable right and left arrows (for now) TODO: Implement this
            return;
        else if (key.name == "up")                          // Get the latest history
            histCycle("prev");
        else if (key.name == "down")                        // Go forward a command if currentPrev is within range
            histCycle("next");
        else if (key.name == "tab")                         // Auto completion
            autocomplete();
        else                                                // Have to use other chars in this case.
            if (key.ctrl == false)
                acceptChar(key.sequence);
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    prompt(false);
}

function onEnter() {
    if (buffer == "!!") {
        buffer = history[history.length-1];
    } else if (buffer.trim() == "") {
        prompt(true);
        return;
    }

    history.push(buffer);       // Add to history
    
    executeCmd(buffer, function(lineBreak) {
        prompt(lineBreak != false);
    });
}

// TODO This segment will be affected once left/right arrow keys are implemented
function backspace() {
    if (currentChar > 0) {
        echo("\033[1D", true);
        echo(' ', true);
        echo("\033[1D", true);
        currentChar--;
        buffer = buffer.substring(0, buffer.length-1);
    } else {
        bell();
        return;
    }
}

// Cycle forwards or backwards through cmd history
function histCycle(direction) {
    var oldCmd;

    if (direction == "prev" && history.length-currentPrev > 0) {
        oldCmd = history[history.length-currentPrev-1];
        currentPrev++;
    } else if (direction == "next" && currentPrev >= 1) {
        // Make it a blank terminal if the currentPrev is 1
        oldCmd = (currentPrev == 1) ? "" : history[history.length-currentPrev+1];
        currentPrev--;
    } else {
        bell();
        return;
    }

    echo("\033[1G", true);  // Moves cursor to beginning of line
    echo("\033[0K", true);  // Clear from cursor to end of line
    echo(promptVal, true);  // Echo prompt
    echo(oldCmd, true);     // Echo previous cmd

    buffer = oldCmd;        // Update buffer to previous cmd
    currentChar = buffer.length;
}

function autocomplete() {
    var matches = [];
    var tmpstr = "";
    var args = argsParser(buffer);
    var found = false;

    Object.keys(commands).forEach(function(command) {
        var reg = new RegExp("^"+buffer);

        if(args[0] == command) {
            found = true;
            return false;
        }

        if (reg.test(command) == true)
            matches.push(command);
    });

    if(found) {
        if(args.length == 1 && commands[args[0]].format)
            commands[args[0]].format();
        else if(commands[args[0]].autocomplete)
            commands[args[0]].autocomplete(args.slice(1));
    } else if (matches.length == 1) {           // 1 match so insert
        var cmd = matches[0] + " ";

        echo("\033["+buffer.length+"D", true);  // Move cursor back to beginning of prompt
        echo(cmd, true);

        buffer = cmd;                           // Update buffer to previous cmd
        currentChar = cmd.length;
    } else if (matches.length > 1) {            // Display matches to choose from
        matches.forEach(function(val) {
            tmpstr += val + ", ";
        });
        echo(tmpstr.substr(0, tmpstr.length-2));
    } else {
        bell();
        return;
    }
}

function clear() {
    echo("\033[2J", true);
    echo("\033[;H", true);
    return false;
}

function quit() {
    echo('\nStopping server...\n', true);
    process.exit(1);
}

function printHistory() {
    console.log();
    var a = 0;
    history.forEach(function (item) {
        console.log(++a+".\t"+item);
    });
    return false;
}

function prompt(newline) {
    buffer = "";
    currentChar = 0;
    currentPrev = 0;

    if (newline == true)
        echo('\n', true); 
        
    echo(promptVal, true);
}

function acceptChar(ch) {
    var reg = new RegExp(/\S| /);

    if (reg.test(ch) != true)
        return;

    buffer += ch;   // Add to buffer
    echo(ch, true); // Output character
    currentChar++;  // Increase character count
}

function bell() {
    echo('\u0007', true);
}

function argsParser(text) {
    if (!text)
        return [];

    var words = text.trim().split(" ");
    var normalized = [];

    var outer_quote = false;
    var tmp = [];
    for (var i = 0; i < words.length; i++) {
        if (!outer_quote && (words[i].charAt(0) == "\"" || words[i].charAt(0) == "\'")) {
            outer_quote = words[i].charAt(0);
            words[i] = words[i].slice(1);
        }

        if (outer_quote) {
            if (words[i])
                tmp.push(words[i]);

                if (words[i].charAt(words[i].length-1) == outer_quote) {
                    outer_quote = false;
                    var endQuote = tmp[tmp.length-1];
                    tmp[tmp.length-1] = endQuote.slice(0, endQuote.length-1);

                    normalized.push(tmp.join(" "));
                    tmp = [];
                }
        } else if (words[i])
        normalized.push(words[i]);
    }

    return normalized;
}

// TODO Put this in the users module
function listUsers() {
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

// Loads in all modules and commands
function load() {
    fs.readdirSync("console/modules").forEach(function(val) {
        if (val.charAt(0) == ".")
            return;

        modules.push(require('./modules/' + val.substr(0, val.length-3)));

        Object.keys(modules[modules.length - 1].commands).forEach(function(key) {
            commands[key] = modules[modules.length - 1].commands[key];
        });
    });
}

function executeCmd(buffer, callback) {
    var args = argsParser(buffer);

    if (args == null) {
        typeof callback === 'function' && callback(retval);
        return;
    }

    if (!commands[args[0]]) {
        echo("\n"+args[0]+": command not found", true);
    } else {
        var retval = commands[args[0]](args, callback);    // Run command
    }

    if (args[0] != "uptime") {
        typeof callback === 'function' && callback(retval);
    }
}

function echo(txt, special) {
    special = typeof special !== 'undefined' ? special : false;

    // If it isn't an echo from the console, then show line and fix stdin buffer
    if (!special) {
        echo("\033[1G", true);  // Moves cursor to beginning of line
        echo("\033[0K", true);  // Clear from cursor to end of line
        echo(txt+"\n", true);   // Echo text
        echo(promptVal, true);  // Put buffer back
        echo(buffer, true);
    } else {
        process.stdout.write(txt);
    }
};

exports.log = echo;
