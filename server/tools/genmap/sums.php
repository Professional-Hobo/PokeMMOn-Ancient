<?php
chdir(dirname(__FILE__));
$maps = array_values(array_diff(scandir("../../map_src"), array('..', '.')));
$hashes = array_values(array_diff(scandir("../../map_src/.hashes"), array('..', '.')));

foreach ($maps as &$map) {
    if ($map[0] == '.') {
        $map = null;
    }
}

foreach ($hashes as &$hash) {
    if ($hash[0] == '.') {
        $hash = null;
    }
}
// Remove hidden files
$maps = array_values(array_filter($maps));
$hashes = array_values(array_filter($hashes));

unset($map);
foreach ($maps as $map) {
    // If sum file doesn't exist, then map hasn't been generated yet
    if (!file_exists("../../map_src/.hashes/" . substr($map, 0, -3) . "sum")) {
        $results[substr($map, 0, -4)] = "new";
    } else if (file_get_contents("../../map_src/.hashes/" . substr($map, 0, -3) . "sum") == md5_file("../../map_src/" . $map)) {
        $results[substr($map, 0, -4)] = "unmodified";
    } else {
        $results[substr($map, 0, -4)] = "modified";
    }
}
echo json_encode($results);
?>
