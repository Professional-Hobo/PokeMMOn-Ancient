// Required modules/files
var app            = require('http').createServer(),
    settings       = require('../settings.json'),
    db             = require('./app/util/db'),
    io             = require('socket.io')(app),
    cookie         = require('cookie'),
    serverConsole  = require('./console/console'),
    colors         = require('colors'),

    echo           = serverConsole.echo,
    info           = serverConsole.info,
    world          = require('./app/World');

// Keep MySQL connection alive
setInterval(function () {
        db.queryDB.query('SELECT 1');
}, 5000);

// --------- Add session object to socket object for easy access -------- //
io.use(function(socket, next) {
    var data = socket.handshake || socket.request;
    socket.session_id = cookie.parse(data.headers.cookie)[settings.session.cookie.name];

    db.sessionDB.get(socket.session_id, function(err, session) {
        socket.session = session;
        socket.ip      = data.address;

        if(err) return next(err);

        if(!session) {
            info("user".green, "Guest has connected from "+socket.ip);
            return next(new Error("No Session Found!"));
        }

        info("user".green, socket.session.username+" has connected from "+socket.ip);
        next();
    });
});

// Multiple logins detection
io.use(function(socket, next) {
    io.sockets.sockets.forEach(function(sock) {
        if (sock.session.username == socket.session.username) {
            sock.emit('multiple logins', "You've logged in from another location.");
            world.save(sock.session.username);
            sock.disconnect();

            // We can't do this because it saves, disconnects, AND also removes the user from the players list
            // which causes the 2nd login from another location to not have an index in the players list.
            //world.unloadPlayer(sock.session.username, sock.disconnect);
            info("user".green, socket.session.username+" has logged in from another location.");
        }
    });
    next();
});

// --------- Add Player object to socket object for easy access -------- //
/*
io.use(function(socket, next) {
    //world.loadPlayer(socket.session.username, socket, next);
    next();
});
*/

// --------- Set up socket events here and pass them over to the engine -------- //
io.on('connection', function(socket) {
    world.loadPlayer(socket.session.username, socket, function(player) {
        players[socket.session.username] = player;
    });

    // Load player's location
    db.queryDB.query('SELECT * FROM `users` WHERE `username` = ?', [socket.session.username], function(err, rows) {
        if (err) throw err;
        socket.emit('preData', { zone: rows[0].zone, x: rows[0].x, y: rows[0].y, direction: rows[0].direction, username: rows[0].username, model: rows[0].model});
    });

    // Update players location
    socket.on('locationUpdate', function(data) {
        //info("user".green, socket.session.username+" has moved to "+data.zone+"["+(data.x)+","+(data.y)+"]["+data.direction+"]");
        //db.queryDB.query("UPDATE users SET x = ?, y = ?, zone = ?, direction = ? WHERE username = ?", [data.x, data.y, data.zone, data.direction, socket.session.username]);

        // Update location
        players[socket.session.username].setPos(data.zone, data.x, data.y, data.direction);
    });

    socket.on('disconnect', function () {
        // Save modified session data back to server. Changes to the session object aren't automatically pushed to the db
        // This can be done with the following line:
        // db.sessionDB.set(socket.session_id, socket.session, function(err) {put error handling code here});
        
        world.unloadPlayer(socket.session.username);
        info("user".green, socket.session.username+" has disconnected from "+socket.ip);
    });
});

serverConsole.init({
    'io': io,
    'sockets': io.sockets.sockets
});
serverConsole.start();      // Console for the game server

world.init();
world.start();              // Start the game server backend

app.listen(process.argv[2] || settings.game.port);

process.on('SIGTERM', function () {
    info("server".red, "Crash detected...attempting to save player data...\n", true);
    world.shutdown();
    process.exit(1);
});