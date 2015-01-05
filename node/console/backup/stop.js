module.exports = function() {
    var echo = require("../console").log;
    echo('\nStopping server...\n', true);
    process.exit(1);
    return true;
};
