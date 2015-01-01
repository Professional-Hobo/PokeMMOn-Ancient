<?php
require_once("global.php");
loginCheck();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title><?=$config->getName()?></title>
    </head>
    <body>
        <div align="center">
            <h1><?=$config->getName()?></h1>
            <hr width="50%">
            <h3><a href="login.php">Login</a> | <a href="register.php">Register</a></h3>
        </div>
    </body>
</html>
