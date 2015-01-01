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
        <div align="center">
            <h1>Home</h1>
            <hr width="50%">
            <h3><a href="client/game.php">Play Game</a> | <a href="leaderboards.php">Leaderboards</a> | <a href="login.php?do=logout">Logout</a></h3>
        </div>
    </body>
</html>
