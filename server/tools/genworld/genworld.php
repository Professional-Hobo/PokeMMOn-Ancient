<?php
chdir(dirname(__FILE__));

// Using map src code to generate the map
$maps = array_values(array_diff(scandir("../../map_src"), array('..', '.', ".hashes")));
foreach ($maps as &$map) {
    echo $map . ":" . shell_exec("php ../genmap/genmap.php " . substr($map, 0, -4));
}
?>