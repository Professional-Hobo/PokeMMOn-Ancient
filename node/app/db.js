var session =   require('connect-redis')(require('express-session')),
    mysql =     require('mysql'),
    settings =  require('../settings.json');

module.exports.sessionDB = new session(settings.db.session);
module.exports.queryDB = mysql.createConnection(settings.db.general);

