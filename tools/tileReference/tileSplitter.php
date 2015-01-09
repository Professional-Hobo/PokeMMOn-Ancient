<?php
require_once("server/tools/mapgen/Tile.class.php");

for ($a = 0; $a < 7985; $a++) {
    tile($a);
    echo $a . "\t" . round(($a/7985)*100, 2) . "%\n";
}

function tile($id) {
    $bg = 3033;
    $tileset = imagecreatefrompng("tiles.png");
    $pos = $id;
    $x = $pos%8;
    $y = floor($pos/8);

    $bg_x = $bg%8;
    $bg_y = floor($bg/8);

    $img = imagecreatetruecolor(16, 16);
    if ($bg == null && $tile[WLK] == 0x1) {
        imagealphablending($img, false);
    } else {
        imagealphablending($img, true);
    }
    imagesavealpha($img, true);

    // Background
    if ($bg !== null) {
        imagecopyresampled($img, $tileset, 0, 0, $bg_x*16, $bg_y*16, 16, 16, 16, 16);
    }
    imagecopyresampled($img, $tileset, 0, 0, $x*16, $y*16, 16, 16, 16, 16);
    imagepng($img, "tiles/" . $id . ".png");
}
?>
