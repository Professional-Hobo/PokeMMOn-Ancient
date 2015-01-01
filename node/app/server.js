var app = require('http').createServer(),
    settings = require('../../settings.json'),
    db = require('./db'),
    io = require('socket.io')(app),
    cookie = require('cookie');

// --------- Add session object to socket object for easy access -------- //
io.use(function(socket, next) {
    var data = socket.handshake || socket.request,
        session_id = cookie.parse(data.headers.cookie)[settings.session.cookie.name];

    db.sessionDB.get(session_id, function(err, session) {
        if(err) throw err;
        if(!session) return next(new Error("No Session Found!"));
        socket.session = session;
    });

    next();
});

app.listen(process.env.PORT || 3001);   // Default port is 3001
