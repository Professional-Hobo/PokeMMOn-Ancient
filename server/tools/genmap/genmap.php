<?php
chdir(dirname(__FILE__));
require_once("Map.class.php");

// Using map src code to generate the map
$map = new Map("../../map_src/" . $argv[1] . ".map");

// Update hash
file_put_contents("../../map_src/.hashes/" . $argv[1] . ".sum", md5_file("../../map_src/" . $argv[1] . ".map"));

$map->genImage(true);
if ($map->getStatus() == null) {
    echo "\033[32mdone\033[0m\n";
} else {
    echo $map->getStatus();
}
?>