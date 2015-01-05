module.exports = function() {
    var echo = require("../console").log;
    echo("\033[2J", true);
    echo("\033[;H", true);
    return false;
};
