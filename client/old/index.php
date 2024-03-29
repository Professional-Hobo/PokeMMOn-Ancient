<?
    require_once("../global.php");
    require_once("../config.php");
    loginCheck();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Pokemon Chrome</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.5">
        <link rel="stylesheet" type="text/css" href="css/game.css">
        <link id="walkables_css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <map hidden></map>
        <div id="game" style="position: relative; left: 0; top: 0;">
            <div id="walkables"></div>
            <img id="player" style="position: absolute;">
            <img id="map" style="position: relative; top: 0; left: 0; z-index:0">
        </div>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="js/jquery.cookie.js"></script>
        <script src="<?=$config->settings->general->domain . ":" . $config->settings->game->port?>/socket.io/socket.io.min.js"></script>
        <script src="js/preload.js"></script>
        <script src="js/config.js"></script>
        <script src="js/entity.js"></script>
        <script src="js/player.js"></script>
        <script src="js/npc.js"></script>
        <script src="js/map.js"></script>
        <script src="js/buzz.min.js"></script>
        <script src="js/loadSave.js"></script>
        <script src="js/game.js"></script>
        <p id="fps">FPS: 0.00</p>
        <p id="frame"></p>
        <p id="entities"></p>
        <button onClick="newNPC()">Click me!</button>
        <button onClick="removeAllEntities()">Clear all entities</button>
    </body>
</html>
