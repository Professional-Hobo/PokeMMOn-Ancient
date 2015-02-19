<?php
require_once("config.php");
require('redis-session-php/redis-session.php');
session_name($config->settings->session->cookie->name);
RedisSession::start();

function loginCheck() {
    $location = basename($_SERVER['PHP_SELF']);
    // If user is logged in and at a location for guests, redirect them to their home
    if ($_SESSION['loggedin'] == true && in_array($location, array("index.php", "register.php", "login.php", "game.php"))) {
        header('Location: home.php');
        die;
    }
    if ($_SESSION['loggedin'] != true && !in_array($location, array("index.php", "register.php", "login.php", "game.php"))) {
        header('Location: index.php');
        die;
    }
}
?>
