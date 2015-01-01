<?php
require_once("User.class.php");
require_once("global.php");
loginCheck();
if ($_POST != null) {
    if (User::add($_POST['username'], $_POST['password'])) {
        $msg = "<font color='green'>Registered Successfully!</font>";
    } else {
        $msg = "<font color='red'>Error, username already exists!</font>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Register :: <?=$config->getName()?></title>
    </head>
    <body>
        <div align="center">
            <h1>Register</h1>
            <hr width="50%">
            <?=$msg?>
            <h3><a href="index.php">Homepage</a> | <a href="login.php">Login</a></h3>
            <form action="" method="POST">
                <input type="text" name="username" placeholder="username" autofocus><br>
                <input type="password" name="password" placeholder="password"><br>
                <input type="submit" value="Register">
            </form>
        </div>
    </body>
</html>
