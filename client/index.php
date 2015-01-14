<!DOCTYPE html>
<html>
    <head>
        <title>PokeMMOn</title>
        <script src="<?=$config->settings->general->domain . ":" . $config->settings->game->port?>/socket.io/socket.io.min.js"></script>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="js/utility.js"></script>
        <script src="js/player.js"></script>
        <script src="js/game.js"></script>
        <script>
            var game = new Game({
                server: <?=$config->settings->general->domain . ":" . $config->settings->game->port?>
            });
            game.start();
        </script>
    </head>
    <body>

    </body>
</html>
