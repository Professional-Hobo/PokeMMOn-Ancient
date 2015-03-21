<?php
require_once("../global.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Home :: <?=$config->getName()?></title>
        <style>
            html, body {
              width:  100%;
              height: 100%;
              margin: 0px;
              image-rendering: -moz-crisp-edges;
            image-rendering: -o-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            -ms-interpolation-mode: nearest-neighbor;
            image-rendering: pixelated;
            }
            #background {
                display: none;
            }
        </style>
        <link rel='stylesheet' href='css/nprogress.css'/>
    </head>
    <body>
        <script src="http://keitharm.me:8080/socket.io/socket.io.js"></script>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src='js/nprogress.js'></script>
        <script src="js/preload.js"></script>
        <script src="js/game.js"></script>
        <script src="js/Entity.js"></script>
        <script src="js/Player.js"></script>
        <div width="100%" height="100%">
            <div id="fps">0 fps</div>
            <div id="loading"></div>
            <canvas id="game" width="528" height="528"></canvas>
        </div>
            <script>
            $("#game").hide();
            $(window).load(function() {
                $('#loading').text('');
                $("#game").show(1000, function() {
                    $('#loading').text('');
                    freeze = false;
                });
            });
            var freeze = true;
            var UP = 87;
            var DOWN = 83;
            var RIGHT = 68;
            var LEFT = 65;
            
            // Set up socket
            var socket = io('http://keitharm.me:8080');

            var canvas = document.getElementById('game');
            var context = canvas.getContext('2d');

            var models;

            context.scale(1, 1);

            var background = document.createElement("img");
            background.src = "http://keitharm.me/pokemmon/keith/client/assets/world/surface.png";

            // Load 
            socket.on('preData', function(data) {
                $.getJSON("js/models.json", function(modelData) {
                    models = modelData;

                    // Load player location data first before starting game since game depends on player's initial spot
                    game = new Game({server: "keitharm.me:8080"});
                    game.start(data.username, data.model, data.direction, data.x, data.y, function() {
                        context.drawImage(background, (game.player.x-17)*16, (game.player.y-17)*16, 528, 528, 0, 0, 528, 528);
                    });

                    /*player.onload = function() {
                        //context.drawImage(player, <?=ceil($width/2)*16?>, <?=ceil($width/2)*16-4?>);
                        //player.src = "http://keitharm.me/pokemmon/keith/client/assets/sprites/player/male_1/"+dirstr+"_1.png";
                        player = new Player("male_1", data.direction, data.x, data.y);
                    }*/
                });
            });

            //context.drawImage(background, map_x*16, map_y*16, 336, 336, 0, 0, 336, 336);


            /*
            $('canvas').drawImage({
              source: 'http://keitharm.me/pokemmon/keith/server/combine.png',
              x: 0, y: 0,
              sWidth: 528,
              sHeight: 528,
              sx: (map_x*16+(game.x_diff*game.amt)), sy: (map_y*16+(game.y_diff*game.amt)),
              cropFromCenter: false,
              scale: 1
            });
            */
            
            /*
            function resize() {
                // Our canvas must cover full height of screen
                // regardless of the resolution
                var height = window.innerHeight;
                
                // So we need to calculate the proper scaled width
                // that should work well with every resolution
                var ratio = canvas.width/canvas.height;
                var width = height * ratio;
                
                canvas.style.width = (width-4)+'px';
                canvas.style.height = (height-4)+'px';
            }

            window.addEventListener('load', resize, false);
            window.addEventListener('resize', resize, false);
            */

            multiple_login = false;

            socket.emit('hey', "Hi there!");

            socket.on('hey', function(data) {
                console.log(data);
            });

            socket.on('msg', function(data) {
                window.alert(data);
            });

            socket.on('update', function(data) {
                game.playerData = $.parseJSON(data);
            });

            socket.on('move', function(data) {
                game.player.move(data);
            });

            socket.on('multiple logins', function(data) {
                cancelAnimationFrame(game.loop);
                console.log(data);
                context.save();

                context.fillStyle = "rgba(0, 0, 0, 0.5)";
                context.fillRect(0, 0, 528, 528);

                context.restore();

                context.font="20px Georgia";
                context.fillStyle = 'white';
                context.fillText("You've logged in from another location!",75,264);
                multiple_login = true;
            });

            socket.on('disconnect', function(data) {
                console.log("Disconnected from server");
                cancelAnimationFrame(game.loop);
                if (!multiple_login) {
                    context.save();

                    context.fillStyle = "rgba(0, 0, 0, 0.5)";
                    context.fillRect(0, 0, 528, 528);

                    context.restore();

                    context.font="20px Georgia";
                    context.fillStyle = 'white';
                    context.fillText("You've been disconnected from the server!",75,264);
                }
            });

            /*
            $(window).focus(function() {
                game.resume();
            })
            .blur(function() {
                game.pause();
                context.save();

                context.fillStyle = "rgba(0, 0, 0, 0.5)";
                context.fillRect(0, 0, 528, 528);

                context.restore();

                context.font="20px Georgia";
                context.fillStyle = 'white';
                context.fillText("Game Paused",180,264);
            });
            */

            socket.on('error', function(data) {
                console.log(data);
            });

        </script>
    </body>
</html>
