// Required modules/files
var app      = require('http').createServer(),
    settings = require('../settings.json'),
    db       = require('./app/util/db'),
    io       = require('socket.io')(app),
    cookie   = require('cookie'),
    console  = require('./console/console'),
    colors   = require('colors');
    //World   = require('./app/World');

// --------- Add session object to socket object for easy access -------- //
io.use(function(socket, next) {
    var data = socket.handshake || socket.request;
    socket.session_id = cookie.parse(data.headers.cookie)[settings.session.cookie.name];

    db.sessionDB.get(socket.session_id, function(err, session) {
        socket.session = session;
        socket.ip      = data.address;
        if(err) return next(err);
        if(!session) {
            console.log("[user]".grey+" Guest has connected from "+socket.ip);
            return next(new Error("No Session Found!"));
        }
        console.log("[user]".grey+" "+socket.session.username+" has connected from "+socket.ip);
    });
    next();
});

// --------- Add Player object to socket object for easy access -------- //
io.use(function(socket, next) {
    //World.loadPlayer(socket.session.username);   
    next();
});

// --------- Set up socket events here and pass them over to the engine -------- //
io.on('connection', function(socket) {
    if (!socket.session) {
        return;
    }
    socket.on('hey', function(data) {
        socket.emit('hey', socket.session.username);
    });

    socket.on('disconnect', function () {
        // Save modified session data back to server. Changes to the session object aren't automatically pushed to the db
        // This can be done with the following line:
        // db.sessionDB.set(socket.session_id, socket.session, function(err) {put error handling code here});
        console.log("[user]".grey+" "+socket.session.username+" has disconnected from "+socket.ip);
    });
});


// Keith will add command line interface for running game server here
console.init(io);
app.listen(process.env.PORT || 3000);   // Default port is 3001
