<?php
require_once("Tile.class.php");
class Map
{
    const DEBUG       = true;
    const STRICT      = true;
    const TILES       = "tiles.png";
    const GROUP_TILES = array("POKECENTER", "POKEMART", "OAKLAB", "PLAYER_HOUSE", "RIVAL_HOUSE", "GYM");

    private $src;
    private $raw_data;
    private $lines;
    private $map;
    private $id;
    private $vars;
    private $dups;
    private $map_data;
    private $map_lines = 0;
    private $status = null;
    private $boundaries = array();
    private $walkables = array();
    private $animations = array();
    private $group_tiles = array();
    private $unused = array();
    private $sections = array();
    private $warps = array();
    private $events = array();
    private $headers = array();

    public function Map($src) {
        $this->src = $src;
        $this->loadContent();
        $this->parseContent();
        $this->extractHeaders();
        $this->extractVars();
        $this->extractTiles();
        $this->extractWarps();
        $this->extractEvents();
        $this->checkDups();
        $this->checkUnused();
        if (count($this->unused) != 0 && Map::STRICT) {
            print_r($this->unused);
        }
    }

    private function loadContent() {
        if (!file_exists($this->src)) {
            $this->setStatus("\033[31mUnable to read map file.\033[0m");
        } else {
            $this->raw_data = file_get_contents($this->src);
        }
    }

    // Determine where the sections begin and end
    private function parseContent() {
        // Seperate src into lines
        $ex = explode("\n", $this->raw_data);
        foreach ($ex as &$line) {
            $line = trim($line);
            if (strlen($line) == 0 || substr($line, 0, 2) == "//") {
                $line = null;
            }
        }
        $ex = array_filter($ex);
        $ex = array_values($ex);
        $this->lines = $ex;

        $this->sections["headers"] = array(array_search("@headers", $ex), array_search("!headers", $ex));
        $this->sections["vars"] = array(array_search("@vars", $ex), array_search("!vars", $ex));
        if ($this->sections["vars"][0] === false || $this->sections["vars"][1] === false) {
            $this->setStatus("\033[31mFailed to detect variable definitions.\033[0m");
        }
        $this->sections["map"] = array(array_search("@map", $ex), array_search("!map", $ex));
        if ($this->sections["map"][0] === false || $this->sections["map"][1] === false) {
            $this->setStatus("\033[31mFailed to detect map data.\033[0m");
        }
        $this->sections["warps"] = array(array_search("@warps", $ex), array_search("!warps", $ex));
        if ($this->sections["warps"][0] === false || $this->sections["warps"][1] === false) {
            $this->setStatus("\033[31mFailed to detect warp data.\033[0m");
        }
        $this->sections["events"] = array(array_search("@events", $ex), array_search("!events", $ex));
    }

    private function extractHeaders() {
        // Go through each line of warps section
        $ex = array_slice($this->lines, $this->sections["headers"][0]+1, $this->sections["headers"][1]-($this->sections["headers"][0]+1));
        foreach ($ex as $line) {
            // Seperate between the =
            $deli = explode("=", $line);
            foreach ($deli as &$value) {
                $value = trim($value);
            }

            $this->headers[$deli[0]] = $deli[1];
        }
    }

    private function extractVars() {
        // Go through each line of vars section
        $ex = array_slice($this->lines, $this->sections["vars"][0]+1, $this->sections["vars"][1]-($this->sections["vars"][0]+1));

        foreach ($ex as $line) {
            // Seperate line into 2 parts delimited by =
            $sep = explode("=", $line);

            // Remove whitespace
            foreach ($sep as &$val) {
                $val = trim($val);
            }

            // Store variable value
            // This is a foreground/background combo variable (for use with tiles that have transparent backgrounds)
            if (strpos($sep[1], "^") !== false) {
                $fgbg = explode("^", $sep[1]);
                foreach ($fgbg as $v) {
                    $constant = @constant("Tile::" . trim($v));
                    // Check if invalid and not in group tile list
                    if ($constant === null && !in_array($v, Map::GROUP_TILES)) {
                        $this->setStatus("\033[31mInvalid tile name \033[33m" . $v . "\033[31m.\033[0m");
                    }
                    if (in_array($v, Map::GROUP_TILES)) {
                        $this->group_tiles[$v] = 1;
                    }
                }
                if (isset($this->vars[$sep[0]])) {
                    $this->dups[] = $sep[0];
                } else {
                    $this->vars[$sep[0]] = $sep[1];
                }
                continue;
            }
            $constant = @constant("Tile::" . $sep[1]);
            if ($constant === null) {
                if (in_array($sep[1], Map::GROUP_TILES)) {
                    $this->setStatus("\033[33m" . $sep[1] . "\033[31m must have a background tile.\033[0m");
                }
                $this->setStatus("\033[31mInvalid tile name \033[33m" . $sep[1] . "\033[31m.\033[0m");
            } else {
                if (isset($this->vars[$sep[0]])) {
                    $this->dups[] = $sep[0];
                } else {
                    $this->vars[$sep[0]] = $sep[1];
                }
            }
        }
    }

    private function extractTiles() {
        // Go through each line of map section
        $ex = array_slice($this->lines, $this->sections["map"][0]+1, $this->sections["map"][1]-($this->sections["map"][0]+1));
        foreach ($ex as $line) {
            if (strlen($line) != 0) {
                $this->map_data .= $line . "\n";
            }
        }
    }

    private function extractWarps() {
        // Go through each line of warps section
        $ex = array_slice($this->lines, $this->sections["warps"][0]+1, $this->sections["warps"][1]-($this->sections["warps"][0]+1));
        foreach ($ex as $line) {
            // Seperate between the =
            $deli = explode("=", $line);
            foreach ($deli as &$value) {
                $value = trim($value);
            }
            // Get coordinates of src
            preg_match("/\d*x\d*/", $deli[0], $src_coords);
            $src_coords = array("x" => substr($src_coords[0], 0, strpos($src_coords[0], "x")), "y" => substr($src_coords[0], strpos($src_coords[0], "x")+1));

            // Get direction of src (if any);
            preg_match("/\[\d\]/", $deli[0], $src_direction);
            $src_direction = substr($src_direction[0], 1, 1);

            // Determine if player should walk in to spot or not
            preg_match("/\*/", $deli[0], $walkin);
            $walkin = $walkin[0] == "*" ? true : false;

            // Get the new map to load in
            preg_match("/.+?(?=->)/", $deli[1], $dst_map);
            $dst_map = $dst_map[0];

            // Get the coordinates of where to place player when they warp
            preg_match("/\d*x\d*/", $deli[1], $dst_coords);
            $dst_coords = array("x" => substr($dst_coords[0], 0, strpos($dst_coords[0], "x")), "y" => substr($dst_coords[0], strpos($dst_coords[0], "x")+1));

            // Get direction of dst (if any);
            preg_match("/\[\d\]/", $deli[1], $dst_direction);
            $dst_direction = substr($dst_direction[0], 1, 1);

            // Determine if player should walk out to spot or not
            preg_match("/\*/", $deli[1], $walkout);
            $walkout = $walkout[0] == "*";

            // Get sound effect (if any) for when player warps
            preg_match("/\s(.*)/", $deli[1], $sound);
            $sound = substr($sound[0], 1);

            $this->warps[] = array("src_coords" => $src_coords, "src_direction" => $src_direction, "walkin" => $walkin, "map" => $dst_map, "dst_coords" => $dst_coords, "dst_direction" => $dst_direction, "walkout" => $walkout, "sound" => $sound);
        }
    }

    private function extractEvents() {
        // Go through each line of events section
        $ex = array_slice($this->lines, $this->sections["events"][0]+1, $this->sections["events"][1]-($this->sections["events"][0]+1));
        foreach ($ex as $line) {
            // Seperate between the =
            $deli = explode("=", $line);
            foreach ($deli as &$value) {
                $value = trim($value);
            }

            // Textbox event
            if (preg_match("/\".*\"/", $deli[1], $event)) {
                 // Get coords of event
                preg_match("/\d*x\d*/", $deli[0], $coords);
                $coords = array("x" => substr($coords[0], 0, strpos($coords[0], "x")), "y" => substr($coords[0], strpos($coords[0], "x")+1));

                $event = substr($event[0], 1, -1);
                if (preg_match("/(\w*)\s*$/", $deli[1], $sound)) {
                    $sound = $sound[0];
                }
                $this->events[] = array("coords" => $coords, "event" => "text", "sound" => $sound, "value" => $this->var_replace($event));
            }
        }
    }

    public function genImage($save = false, $name = null) {
        $tiles  = imagecreatefrompng(Map::TILES);
        $lines  = explode("\n", $this->map_data);
        $width  = max(array_map('strlen', $lines));
        $height = count($lines);

        if ($lines[$height-1] == null) {
            $height--;
        }

        $this->map = imagecreatetruecolor($width*16, $height*16);
        imagealphablending($this->map, true);
        imagesavealpha($this->map, true);
        for ($a = 0; $a < $height; $a++) {
            for ($b = 0; $b < strlen($lines[$a]); $b++) {
                if ($this->vars[$lines[$a][$b]] === null) {
                    $this->setStatus("\033[31mMap tile \033[33m" . $lines[$a][$b] . "\033[31m was not found in the vars definition section.\033[0m", false);
                }

                // If fgbg tile (transparencies) else normal tile
                if (strpos($this->vars[$lines[$a][$b]], "^") !== false) {
                    $fgbg = explode("^", $this->vars[$lines[$a][$b]]);
                    $bg = new Tile($fgbg[0]);

                    // If pokecenter, choose appropriate tile
                    if ($fgbg[1] == "POKECENTER") {
                        $fg = new Tile("POKECENTER_" . ($this->group_tiles["POKECENTER"]));
                        $this->group_tiles["POKECENTER"]++;
                    } else if ($fgbg[1] == "OAKLAB") {
                        $fg = new Tile("OAKLAB_" . ($this->group_tiles["OAKLAB"]));
                        $this->group_tiles["OAKLAB"]++;
                    } else if ($fgbg[1] == "PLAYER_HOUSE") {
                        $fg = new Tile("PLAYER_HOUSE_" . ($this->group_tiles["PLAYER_HOUSE"]));
                        $this->group_tiles["PLAYER_HOUSE"]++;
                    } else if ($fgbg[1] == "RIVAL_HOUSE") {
                        $fg = new Tile("RIVAL_HOUSE_" . ($this->group_tiles["RIVAL_HOUSE"]));
                        $this->group_tiles["RIVAL_HOUSE"]++;
                    } else if ($fgbg[1] == "POKEMART") {
                        $fg = new Tile("POKEMART_" . ($this->group_tiles["POKEMART"]));
                        $this->group_tiles["POKEMART"]++;
                    } else if ($fgbg[1] == "GYM") {
                        $fg = new Tile("GYM_" . ($this->group_tiles["GYM"]));
                        $this->group_tiles["GYM"]++;
                    } else {
                        $fg = new Tile($fgbg[1]);
                    }

                    // Apply background first
                    imagecopyresampled($this->map, $tiles, $b*16, $a*16, $bg->getCoords()[0]*16, $bg->getCoords()[1]*16, 16, 16, 16, 16);

                    // And then foreground
                    // if it needs to be flipped
                    if (array_key_exists(FLP, constant("Tile::" . $fg->getType())) && $fg->hasFlip()) {
                        $res = $this->goodImageCrop($tiles, array("x" => $fg->getCoords()[0]*16, "y" => $fg->getCoords()[1]*16, "width" => 16, "height" => 16));
                        $this->flipHorizontal($res);
                        imagecopyresampled($this->map, $res, $b*16, $a*16, 0, 0, 16, 16, 16, 16);
                    } else {
                        imagecopyresampled($this->map, $tiles, $b*16, $a*16, $fg->getCoords()[0]*16, $fg->getCoords()[1]*16, 16, 16, 16, 16);
                    }

                    // If foreground OR background has boundary, add to boundary list
                    if ($fg->hasBoundary() || $bg->hasBoundary()) {
                        $this->boundaries[] = array("x" => $b, "y" => $a);
                    }

                    // Check if foreground is is walkable
                    if ($fg->hasWalk()) {
                        $this->walkables[] = array("x" => $b*16, "y" => $a*16, "data" => base64_encode(Tile::getTileImage(constant("Tile::" . $fg->getType()))));
                    }

                    // Check if there is an animation for this tile
                    if ($fg->hasAnimation()) {
                        $this->animations[] = array("x" => $b*16, "y" => $a*16, "data" => $fg->getID());
                    }

                } else {
                    // Apply tile
                    $tile = new Tile($this->vars[$lines[$a][$b]]);
                    imagecopyresampled($this->map, $tiles, $b*16, $a*16, $tile->getCoords()[0]*16, $tile->getCoords()[1]*16, 16, 16, 16, 16);

                    // If tile has boundary, add to boundary list
                    if ($tile->hasBoundary()) {
                        $this->boundaries[] = array("x" => $b, "y" => $a);
                    }

                    // Check if foreground is is walkable
                    if ($tile->hasWalk()) {
                        $this->walkables[] = array("x" => $b*16, "y" => $a*16, "data" => base64_encode(Tile::getTileImage(constant("Tile::" . $tile->getType()))));
                    }

                    // Check if there is an animation for this tile
                    if ($tile->hasAnimation()) {
                        $this->animations[] = array("x" => $b*16, "y" => $a*16, "data" => $tile->getID());
                    }

                }
            }
        }
        if ($save) {
            // Save map
            // if null, use original name
            if ($name === null) {
                $name = basename($this->src);
                $this->id = substr($name, 0, -4);
            } else {
                $this->id = substr(md5(mt_rand(1,1000000)), 0, 16);
            }

            // Make map directory if it doesn't exist
            @mkdir("../../app/maps/" . $this->id);

            // Make map directory if it doesn't exist
            @mkdir("../../../client/assets/maps/" . $this->id);

            // If image is preloaded, don't save
            if ($this->headers["preimage"] != "true") {
                imagepng($this->map, "../../../client/assets/maps/" . $this->id . "/base.png");
            }

            foreach ($this->walkables as $index => $walk) {
                $css  .= "#WLK_" . $index . "{position:absolute; top: " . ($walk["y"]) . "px; left: " . ($walk["x"]) . "px; z-index: 10000;}\n";
                $html .= "<img id=\"WLK_" . $index . "\" src=\"data:image/png;base64," . $walk["data"] . "\">\n";
            }

            foreach ($this->animations as $index => $animation) {
                $css  .= "#ANM_" . $index . "{position:absolute; top: " . ($animation["y"]) . "px; left: " . ($animation["x"]) . "px; z-index: 1;}\n";
                $html .= "<img id=\"ANM_" . $index . "\" src=\"img/animated_tiles/" . $animation["data"] . ".gif\">\n";
            }

            // Add music location
            if ($this->headers["music"] !== null) {
                $html .= "<music hidden>" . $this->headers["music"] . "</music>";
            }

            // SERVER //

            // Save boundaries
            file_put_contents("../../app/maps/" . $this->id . "/boundaries.json", json_encode($this->getBoundaries()));

            // Save Warps
            file_put_contents("../../app/maps/" . $this->id . "/warps.json", json_encode($this->warps));

            // Save Mappings
            file_put_contents("../../app/maps/" . $this->id . "/mapping.json", json_encode(array("up" => array("zone" => "zone_name", "mapping" => array(array(3, 4), array(5,6))))));

            // Save Events
            file_put_contents("../../app/maps/" . $this->id . "/events.json", json_encode($this->events));

            // Save Dimensions
            file_put_contents("../../app/maps/" . $this->id . "/dim.json", json_encode(array("width" => $width, "height" => $height)));

            // CLIENT //

            // Save boundaries
            file_put_contents("../../../client/assets/maps/" . $this->id . "/boundaries.json", json_encode($this->getBoundaries()));

            // Save walkable tiles css
            file_put_contents("../../../client/assets/maps/" . $this->id . "/walkables.css", $css);

            // Save walkable tiles html
            file_put_contents("../../../client/assets/maps/" . $this->id . "/walkables.html", $html);

        } else {
            header('Content-Type: image/png');
            imagepng($this->map);
        }
    }

    private function setStatus($status, $echo = true) {
        $this->status = $status;
        if (Map::DEBUG && $echo) {
            echo "Error: " . $status;
            die;
        }
    }

    private function checkUnused() {
        foreach ($this->vars as $key => $val) {
            if (strpos($this->map_data, $key) === false) {
                $this->unused[] = $key;
            }
        }
        if (count($this->unused) != 0) {
            $this->setStatus("\033[33mUnused variables were detected.\033[0m", false);
        }
    }

    private function checkDups() {
        if (count($this->dups) != 0) {
            print_r($this->dups);
            $this->setStatus("\033[31mDuplicate variables were detected.\033[0m", true);
            die;
        }
    }

    public function getStatus() {
        return $this->status;
    }

    public function getID() {
        return $this->id;
    }

    public function getBoundaries() {
        return $this->boundaries;
    }

    public function getWalkables() {
        return $this->walkables;
    }

    private function flipHorizontal(&$img) {
        $size_x = imagesx($img); $size_y = imagesy($img);
        $temp = imagecreatetruecolor($size_x, $size_y);
        imagealphablending($temp, false);
        imagesavealpha($temp, true);
        $x = imagecopyresampled($temp, $img, 0, 0, ($size_x-1), 0, $size_x, $size_y, 0-$size_x, $size_y);
        if ($x) {
            $img = $temp;
        } else {
            die("Unable to flip image");
        }
    }

    private function goodImageCrop($src, array $rect) {
        $dest = imagecreatetruecolor($rect['width'], $rect['height']);
        imagealphablending($dest, false);
        imagesavealpha($dest, true);
        imagecopyresampled(
            $dest,
            $src,
            0,
            0,
            $rect['x'],
            $rect['y'],
            $rect['width'],
            $rect['height'],
            $rect['width'],
            $rect['height']
        );
    return $dest;
    }

    private function var_replace($text) {
        $str = $text;
        $str = str_replace("PLAYER", "Keith", $str);
        $str = str_replace("RIVAL", "Farhan", $str);

        return $str;
    }
}
?>
