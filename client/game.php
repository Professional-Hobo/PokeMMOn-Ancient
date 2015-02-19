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
            }
            #background {
                display: none;
            }
        </style>
    </head>
    <body>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <div width="100%" height="100%">
            <canvas id="game" width="256" height="256"></canvas>
        </div>
        <script>
            var canvas = document.getElementById('game');
            context = canvas.getContext('2d');
            var background = new Image();
            background.src = "http://keitharm.me/pokemmon/keith/client/assets/maps/start/base.png";
            var right = new Image();
            right.src = "http://keitharm.me/pokemmon/keith/client/assets/maps/route_4/base.png";
            right.onload = function() {
                context.drawImage(right, 0, 0, 256, 256, 0, 0, 256, 256);
            };
        </script>
    </body>
</html>
