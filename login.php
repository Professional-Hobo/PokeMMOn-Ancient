<?php
require_once("User.class.php");
require_once("global.php");

if ($_GET['do'] == "logout") {
    session_destroy();
    header('Location: index.php');
    die;
}
if ($_POST != null) {
    if (User::checkLogin($_POST['username'], $_POST['password'])) {
        $_SESSION['id'] = User::get($_POST['username'])->getID();
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $_POST['username'];
        header('Location: home.php');
        die;
    } else {
        echo "<font color='red'>NO!</font>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Login :: <?=$config->getName()?></title>
    </head>
    <body>
        <div align="center">
            <h1>Login</h1>
            <hr width="50%">
            <h3><a href="index.php">Homepage</a> | <a href="register.php">Register</a></h3>
            <form action="" method="POST">
                <input type="text" name="username" placeholder="username" autofocus><br>
                <input type="password" name="password" placeholder="password"><br>
                <input type="submit" value="Login">
            </form>
        </div>
    </body>
</html>
