<html>
    <body>
        <div style="width:100%;height:16px"></div>
    <table>
        <!--<col style="width:20%">-->
        <thead style="position: fixed; top: 0; left: 8px; background:white">
<?php
    for ($a = -2; $a < 9; $a++) {
?>
            <th>&nbsp;<?=$a > 0?$a:""?>&nbsp;</th>
<?php
    }
?>
        </thead>
        <tbody>
<?php
    for ($a = 0, $b = 1; $a < 7985; $a++) {
        if ($a % 8 == 0) {
            if($a > 0)
                echo "</tr>";
            
            echo "<tr>";
            echo "<td><b>" . $b++ . "</b></td>";
        }
?>
            <td><img src="tiles/<?=$a+1?>.png"></td>
<?php
    }
?>
        </tbody>
    </table>
    </body>
</html>