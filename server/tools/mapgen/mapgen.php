<?php
require_once("mapgen/Map.class.php");
// Using map src code to generate the map
$map = new Map("maps/" . $argv[1] . ".map");
$map->genImage(true);
if ($map->getStatus() == null) {
    echo "done";
} else {
    echo $map->getStatus();
}
?>