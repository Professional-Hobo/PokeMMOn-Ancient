<?php
require_once("global.php");
loginCheck();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Home :: <?=$config->getName()?></title>
    </head>
    <body>
        <script src="http://keitharm.me:3000/socket.io/socket.io.js"></script>
        <script>
            var socket = io('http://keitharm.me:3000');
            socket.emit('hey', "Hi there!");
            socket.on('hey', function(data) {
                console.log(data);
            });
            socket.on('msg', function(data) {
                window.alert(data);
            });
            socket.on('disconnect', function(data) {
                console.log("Disconnected from server");
            });
            socket.on('error', function(data) {
                console.log(data);
            });
        </script>
        <div align="center">
            <h1>Home</h1>
            <hr width="50%">
            <h3><a href="client/game.php">Play Game</a> | <a href="leaderboards.php">Leaderboards</a> | <a href="login.php?do=logout">Logout</a></h3>
        </div>
    </body>
</html>
