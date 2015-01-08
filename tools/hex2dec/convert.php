<?php
$src = file_get_contents("src");
$blah = preg_replace_callback('/ID => (0x[A-Z0-9]*)/', 'thing', $src);
$final = preg_replace_callback('/(0x[A-Z0-9]*)/', 'thing2', $blah);
echo $final;
//echo $src;

function thing($val) {
    $num = hexdec($val[1])+1;
    $row = ceil($num/8);
    $col = $num-($row-1)*8;
    return "ID => array(" . $row . ", " . $col . ")";
}

function thing2($val) {
    return hexdec($val[0]);
}
?>