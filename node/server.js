var app = require('http').createServer(),
    settings = require('../../settings.json'),
    db = require('./db'),
    io = require('socket.io')(app),
    cookie = require('cookie');
    //engine = require('./app/engine');

// --------- Add session object to socket object for easy access -------- //
io.use(function(socket, next) {
    var data = socket.handshake || socket.request,
        session_id = cookie.parse(data.headers.cookie)[settings.session.cookie.name];

    db.sessionDB.get(session_id, function(err, session) {
        if(err) return next(err);
        if(!session) return next(new Error("No Session Found!"));
        socket.session = session;
    });

    next();
});

// --------- Add Player object to socket object for easy access -------- //
io.use(function(socket, next) {
    //use db.queryDB to fetch player data from server
    // then do socket.player = new Player(player data);
    //engine.loadPlayer(socket.session.user);
    //player data will parse the player data from the server or something like that

    next();
});

// --------- Set up socket events here and pass them over to the engine -------- //
io.on('connection', function(socket) {
    socket.on('dead', function(data) {
    //    some game logic

    //engine.playerDead(socket.session.user);

    });
});


// Keith will add command line interface for running game server here

app.listen(process.env.PORT || 3001);   // Default port is 3001
