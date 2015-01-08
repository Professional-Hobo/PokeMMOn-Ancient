var session =   require('connect-redis')(require('express-session')),
    mysql =     require('mysql'),
    settings =  require('../../../settings.json');

var db = function() {};

// Public Functions
db.prototype = {
    sessionDB: new session(settings.db.session),
    queryDB: mysql.createConnection(settings.db.general)
};

module.exports = new db();
