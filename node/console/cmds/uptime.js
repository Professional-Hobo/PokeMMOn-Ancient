module.exports = function(args, sockets, callback) {
    var exec = require('child_process').exec;
    exec('uptime',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log("\n"+error);
            } else {
                console.log("\n"+stdout.substr(1, stdout.length-2));
            }
            return typeof callback === 'function' && callback(false);
        }
    );
};
