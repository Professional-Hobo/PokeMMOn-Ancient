<?php
chdir(dirname(__FILE__));
ini_set("html_errors", 0);
ini_set("error_prepend_string", null);

require_once("Map.class.php");
// Using map src code to generate the map
$map = new Map("maps/" . $argv[1] . ".map");
$map->genImage(true);
if ($map->getStatus() == null) {
    echo "done";
} else {
    echo $map->getStatus();
}
?>