<?
    require_once("../global.php");
    //loginCheck();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>PokeMMOn</title>
    </head>
    <body>

        <script src="http://keitharm.me:3000/socket.io/socket.io.js"></script>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="js/jquery.hotkeys.js"></script>
        <script src="js/utility.js"></script>
        <!--<script src="js/player.js"></script>-->
        <script src="js/game.js"></script>
        <script>
            var game = new Game({
                server: "<?=$config->settings->general->domain . ":" . $config->settings->game->port?>"
            });
            game.start();
        </script>
    </body>
</html>
