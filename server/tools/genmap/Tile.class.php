<?php
const ID = "id";
const BND = "boundary";
const FLP = "flip";
const WLK = "walkable";
const ANM = "animation";

class Tile
{
    const
    ERROR             = array(ID => array(1, 1), BND => 0),

    // Grass
    GRASS_1           = array(ID => array(1, 1), BND => 0),
    GRASS_2           = array(ID => array(1, 2), BND => 0),
    GRASS_3           = array(ID => array(1, 3), BND => 0),
    GRASS_4           = array(ID => array(1, 4), BND => 0),
    GRASS_5           = array(ID => array(380, 2), BND => 0),

    // Trees
    TREE_TOP_L_BG     = array(ID => array(1, 5), BND => 1),
    TREE_TOP_R_BG     = array(ID => array(1, 6), BND => 1),

    TREE_MID_L_BG     = array(ID => array(2, 5), BND => 1),
    TREE_MID_R_BG     = array(ID => array(2, 6), BND => 1),

    TREE_BOT_L_BG     = array(ID => array(3, 5), BND => 1),
    TREE_BOT_R_BG     = array(ID => array(3, 6), BND => 1),

    TREE_TOP_L_NBG    = array(ID => array(1, 7), BND => 1),
    TREE_TOP_R_NBG    = array(ID => array(1, 8), BND => 1),

    TREE_MID_L_NBG    = array(ID => array(2, 7), BND => 1),
    TREE_MID_R_NBG    = array(ID => array(2, 8), BND => 1),

    TREE_BOT_L_NBG    = array(ID => array(3, 7), BND => 1),
    TREE_BOT_R_NBG    = array(ID => array(3, 8), BND => 1),

    TREE_2_TOP_L_NBG  = array(ID => array(513, 7), BND => 1),
    TREE_2_TOP_R_NBG  = array(ID => array(513, 8), BND => 1),

    TREE_2_TOP_L_BG   = array(ID => array(521, 5), BND => 0, WLK => 1),
    TREE_2_TOP_R_BG   = array(ID => array(521, 6), BND => 0, WLK => 1),

    TREE_2_MID_L_NBG  = array(ID => array(514, 7), BND => 1),
    TREE_2_MID_R_NBG  = array(ID => array(514, 8), BND => 1),

    TREE_2_BOT_L_NBG  = array(ID => array(515, 7), BND => 1),
    TREE_2_BOT_R_NBG  = array(ID => array(515, 8), BND => 1),

    CUT_TREE          = array(ID => array(2, 2), BND => 1),

    // Wild Pokemon Grass
    WILD_GRASS        = array(ID => array(2, 1), BND => 0),

    // Bush, rock, flower
    BUSH              = array(ID => array(2, 3), BND => 1),
    ROCK              = array(ID => array(2, 4), BND => 1),
    FLOWER            = array(ID => array(411, 8), BND => 0, ANM => 1),
    SAND_PATCH        = array(ID => array(411, 7), BND => 0),

    // Path
    SAND_PATH_TOP_L   = array(ID => array(3, 1), BND => 0),
    SAND_PATH_TOP_M   = array(ID => array(3, 2), BND => 0),
    SAND_PATH_TOP_R   = array(ID => array(3, 3), BND => 0),

    SAND_PATH_MID_L   = array(ID => array(4, 1), BND => 0),
    SAND_PATH_MID_M   = array(ID => array(4, 2), BND => 0),
    SAND_PATH_MID_R   = array(ID => array(4, 3), BND => 0),

    SAND_PATH_BOT_L   = array(ID => array(5, 1), BND => 0),
    SAND_PATH_BOT_M   = array(ID => array(5, 2), BND => 0),
    SAND_PATH_BOT_R   = array(ID => array(5, 3), BND => 0),

    SAND_PATH_TL_CRNR = array(ID => array(5, 4), BND => 0),
    SAND_PATH_TR_CRNR = array(ID => array(5, 5), BND => 0),
    SAND_PATH_BL_CRNR = array(ID => array(6, 4), BND => 0),
    SAND_PATH_BR_CRNR = array(ID => array(6, 5), BND => 0),

    STON_PATH_TOP_L   = array(ID => array(6, 1), BND => 0),
    STON_PATH_TOP_M   = array(ID => array(6, 2), BND => 0),
    STON_PATH_TOP_R   = array(ID => array(6, 3), BND => 0),

    STON_PATH_MID_L   = array(ID => array(7, 1), BND => 0),
    STON_PATH_MID_M   = array(ID => array(7, 2), BND => 0),
    STON_PATH_MID_R   = array(ID => array(7, 3), BND => 0),

    STON_PATH_BOT_L   = array(ID => array(8, 1), BND => 0),
    STON_PATH_BOT_M   = array(ID => array(8, 2), BND => 0),
    STON_PATH_BOT_R   = array(ID => array(8, 3), BND => 0),

    STON_PATH_TL_CRNR = array(ID => array(7, 4), BND => 0),
    STON_PATH_TR_CRNR = array(ID => array(7, 5), BND => 0),
    STON_PATH_BL_CRNR = array(ID => array(8, 4), BND => 0),
    STON_PATH_BR_CRNR = array(ID => array(8, 5), BND => 0),

    // Boulder
    STR_BOULDER       = array(ID => array(3, 4), BND => 1),

    // Rock Smash
    SMASH_ROCK        = array(ID => array(4, 4), BND => 1),

    // Sign
    WOODEN_SIGN       = array(ID => array(4, 5), BND => 1),
    METAL_SIGN        = array(ID => array(4, 8), BND => 1),

    // Pokeball
    POKEBALL          = array(ID => array(4, 6), BND => 1),

    WATER_TOP_L      = array(ID => array(33, 1), BND => 0),
    WATER_TOP_M      = array(ID => array(33, 2), BND => 0),
    WATER_TOP_R      = array(ID => array(33, 3), BND => 0),
    WATER_MID_L      = array(ID => array(34, 1), BND => 0),
    WATER_MID_M      = array(ID => array(34, 2), BND => 0),
    WATER_MID_R      = array(ID => array(34, 3), BND => 0),
    WATER_BOT_L      = array(ID => array(35, 1), BND => 0),
    WATER_BOT_M      = array(ID => array(35, 2), BND => 0),
    WATER_BOT_R      = array(ID => array(35, 3), BND => 0),

    LADDER           = array(ID => array(34, 4), BND => 0),

    // Buildings
    // Pokecenter
    POKECENTER_1      = array(ID => array(46, 1), BND => 0, WLK => 1),
    POKECENTER_2      = array(ID => array(46, 2), BND => 0, WLK => 1),
    POKECENTER_3      = array(ID => array(46, 3), BND => 0, WLK => 1),
    POKECENTER_4      = array(ID => array(46, 4), BND => 0, WLK => 1),
    POKECENTER_5      = array(ID => array(46, 5), BND => 0, WLK => 1),

    POKECENTER_6      = array(ID => array(47, 1), BND => 1),
    POKECENTER_7      = array(ID => array(47, 2), BND => 1),
    POKECENTER_8      = array(ID => array(47, 3), BND => 1),
    POKECENTER_9      = array(ID => array(47, 4), BND => 1),
    POKECENTER_10     = array(ID => array(47, 5), BND => 1),

    POKECENTER_11     = array(ID => array(48, 1), BND => 1),
    POKECENTER_12     = array(ID => array(48, 2), BND => 1),
    POKECENTER_13     = array(ID => array(48, 3), BND => 1),
    POKECENTER_14     = array(ID => array(48, 4), BND => 1),
    POKECENTER_15     = array(ID => array(48, 5), BND => 1),

    POKECENTER_16     = array(ID => array(49, 1), BND => 1),
    POKECENTER_17     = array(ID => array(49, 2), BND => 1),
    POKECENTER_18     = array(ID => array(49, 3), BND => 1),
    POKECENTER_19     = array(ID => array(49, 4), BND => 1),
    POKECENTER_20     = array(ID => array(49, 5), BND => 1),

    POKECENTER_21     = array(ID => array(50, 1), BND => 1),
    POKECENTER_22     = array(ID => array(50, 2), BND => 1),
    POKECENTER_23     = array(ID => array(50, 3), BND => 0),
    POKECENTER_24     = array(ID => array(50, 4), BND => 1),
    POKECENTER_25     = array(ID => array(50, 5), BND => 1),

    // Pokemart
    POKEMART_1        = array(ID => array(42, 1), BND => 0, WLK => 1),
    POKEMART_2        = array(ID => array(42, 2), BND => 0, WLK => 1),
    POKEMART_3        = array(ID => array(42, 3), BND => 0, WLK => 1),
    POKEMART_4        = array(ID => array(42, 4), BND => 0, WLK => 1),

    POKEMART_5        = array(ID => array(43, 1), BND => 1),
    POKEMART_6        = array(ID => array(43, 2), BND => 1),
    POKEMART_7        = array(ID => array(43, 3), BND => 1),
    POKEMART_8        = array(ID => array(43, 4), BND => 1),

    POKEMART_9        = array(ID => array(44, 1), BND => 1),
    POKEMART_10       = array(ID => array(44, 2), BND => 1),
    POKEMART_11       = array(ID => array(44, 3), BND => 1),
    POKEMART_12       = array(ID => array(44, 4), BND => 1),

    POKEMART_13       = array(ID => array(45, 1), BND => 1),
    POKEMART_14       = array(ID => array(45, 2), BND => 1),
    POKEMART_15       = array(ID => array(45, 3), BND => 0),
    POKEMART_16       = array(ID => array(45, 4), BND => 1),

    // OAK LAB
    OAKLAB_1          = array(ID => array(594, 1), BND => 0, WLK => 1),
    OAKLAB_2          = array(ID => array(594, 2), BND => 0, WLK => 1),
    OAKLAB_3          = array(ID => array(594, 3), BND => 0, WLK => 1),
    OAKLAB_4          = array(ID => array(594, 4), BND => 0, WLK => 1),
    OAKLAB_5          = array(ID => array(594, 5), BND => 0, WLK => 1),
    OAKLAB_6          = array(ID => array(594, 6), BND => 0, WLK => 1),
    OAKLAB_7          = array(ID => array(594, 7), BND => 0, WLK => 1),

    OAKLAB_8          = array(ID => array(595, 1), BND => 1),
    OAKLAB_9          = array(ID => array(595, 2), BND => 1),
    OAKLAB_10         = array(ID => array(595, 3), BND => 1),
    OAKLAB_11         = array(ID => array(595, 4), BND => 1),
    OAKLAB_12         = array(ID => array(595, 5), BND => 1),
    OAKLAB_13         = array(ID => array(595, 6), BND => 1),
    OAKLAB_14         = array(ID => array(595, 7), BND => 1),

    OAKLAB_15         = array(ID => array(596, 1), BND => 1),
    OAKLAB_16         = array(ID => array(596, 2), BND => 1),
    OAKLAB_17         = array(ID => array(596, 3), BND => 1),
    OAKLAB_18         = array(ID => array(596, 4), BND => 1),
    OAKLAB_19         = array(ID => array(596, 5), BND => 1),
    OAKLAB_20         = array(ID => array(596, 6), BND => 1),
    OAKLAB_21         = array(ID => array(596, 7), BND => 1),

    OAKLAB_22         = array(ID => array(597, 1), BND => 1),
    OAKLAB_23         = array(ID => array(597, 2), BND => 1),
    OAKLAB_24         = array(ID => array(597, 3), BND => 1),
    OAKLAB_25         = array(ID => array(597, 4), BND => 1),
    OAKLAB_26         = array(ID => array(597, 5), BND => 1),
    OAKLAB_27         = array(ID => array(597, 6), BND => 1),
    OAKLAB_28         = array(ID => array(597, 7), BND => 1),

    OAKLAB_29         = array(ID => array(598, 1), BND => 1),
    OAKLAB_30         = array(ID => array(598, 2), BND => 1),
    OAKLAB_31         = array(ID => array(598, 3), BND => 1),
    OAKLAB_32         = array(ID => array(598, 4), BND => 1),
    OAKLAB_33         = array(ID => array(598, 5), BND => 0),
    OAKLAB_34         = array(ID => array(598, 6), BND => 1),
    OAKLAB_35         = array(ID => array(598, 7), BND => 1),

    // Player House
    PLAYER_HOUSE_1    = array(ID => array(589, 1), BND => 0, WLK => 1),
    PLAYER_HOUSE_2    = array(ID => array(589, 2), BND => 0, WLK => 1),
    PLAYER_HOUSE_3    = array(ID => array(589, 3), BND => 0, WLK => 1),
    PLAYER_HOUSE_4    = array(ID => array(589, 4), BND => 0, WLK => 1),
    PLAYER_HOUSE_5    = array(ID => array(589, 5), BND => 0, WLK => 1),

    PLAYER_HOUSE_6    = array(ID => array(590, 1), BND => 1),
    PLAYER_HOUSE_7    = array(ID => array(590, 2), BND => 1),
    PLAYER_HOUSE_8    = array(ID => array(590, 3), BND => 1),
    PLAYER_HOUSE_9    = array(ID => array(590, 4), BND => 1),
    PLAYER_HOUSE_10   = array(ID => array(590, 5), BND => 1),

    PLAYER_HOUSE_11   = array(ID => array(591, 1), BND => 1),
    PLAYER_HOUSE_12   = array(ID => array(591, 2), BND => 1),
    PLAYER_HOUSE_13   = array(ID => array(591, 3), BND => 1),
    PLAYER_HOUSE_14   = array(ID => array(591, 4), BND => 1),
    PLAYER_HOUSE_15   = array(ID => array(591, 5), BND => 1),

    PLAYER_HOUSE_16   = array(ID => array(592, 1), BND => 1),
    PLAYER_HOUSE_17   = array(ID => array(592, 2), BND => 1),
    PLAYER_HOUSE_18   = array(ID => array(592, 3), BND => 1),
    PLAYER_HOUSE_19   = array(ID => array(592, 4), BND => 1),
    PLAYER_HOUSE_20   = array(ID => array(592, 5), BND => 1),

    PLAYER_HOUSE_21   = array(ID => array(593, 1), BND => 1),
    PLAYER_HOUSE_22   = array(ID => array(593, 2), BND => 1),
    PLAYER_HOUSE_23   = array(ID => array(593, 3), BND => 1),
    PLAYER_HOUSE_24   = array(ID => array(593, 4), BND => 0),
    PLAYER_HOUSE_25   = array(ID => array(593, 5), BND => 1),

    // Rival House
    RIVAL_HOUSE_1    = array(ID => array(589, 1), BND => 0, WLK => 1),
    RIVAL_HOUSE_2    = array(ID => array(589, 2), BND => 0, WLK => 1),
    RIVAL_HOUSE_3    = array(ID => array(589, 3), BND => 0, WLK => 1),
    RIVAL_HOUSE_4    = array(ID => array(589, 4), BND => 0, WLK => 1),
    RIVAL_HOUSE_5    = array(ID => array(589, 5), BND => 0, WLK => 1),

    RIVAL_HOUSE_6    = array(ID => array(590, 1), BND => 1),
    RIVAL_HOUSE_7    = array(ID => array(590, 2), BND => 1),
    RIVAL_HOUSE_8    = array(ID => array(590, 3), BND => 1),
    RIVAL_HOUSE_9    = array(ID => array(590, 4), BND => 1),
    RIVAL_HOUSE_10   = array(ID => array(590, 5), BND => 1),

    RIVAL_HOUSE_11   = array(ID => array(591, 1), BND => 1),
    RIVAL_HOUSE_12   = array(ID => array(591, 2), BND => 1),
    RIVAL_HOUSE_13   = array(ID => array(591, 3), BND => 1),
    RIVAL_HOUSE_14   = array(ID => array(591, 4), BND => 1),
    RIVAL_HOUSE_15   = array(ID => array(591, 5), BND => 1),

    RIVAL_HOUSE_16   = array(ID => array(592, 5), BND => 1, FLP => 1),
    RIVAL_HOUSE_17   = array(ID => array(592, 4), BND => 1, FLP => 1),
    RIVAL_HOUSE_18   = array(ID => array(592, 3), BND => 1, FLP => 1),
    RIVAL_HOUSE_19   = array(ID => array(592, 2), BND => 1, FLP => 1),
    RIVAL_HOUSE_20   = array(ID => array(592, 1), BND => 1, FLP => 1),

    RIVAL_HOUSE_21   = array(ID => array(593, 5), BND => 1, FLP => 1),
    RIVAL_HOUSE_22   = array(ID => array(593, 4), BND => 0, FLP => 0),
    RIVAL_HOUSE_23   = array(ID => array(593, 3), BND => 1, FLP => 1),
    RIVAL_HOUSE_24   = array(ID => array(593, 2), BND => 1, FLP => 1),
    RIVAL_HOUSE_25   = array(ID => array(593, 1), BND => 1, FLP => 1),

    GYM_1            = array(ID => array(41, 5), BND => 0, WLK => 1),
    GYM_2            = array(ID => array(41, 6), BND => 0, WLK => 1),
    GYM_3            = array(ID => array(41, 7), BND => 0, WLK => 1),
    GYM_4            = array(ID => array(41, 8), BND => 0, WLK => 1),
    GYM_5            = array(ID => array(46, 6), BND => 0, WLK => 1),
    GYM_6            = array(ID => array(46, 7), BND => 0, WLK => 1),
    GYM_7            = array(ID => array(46, 8), BND => 0, WLK => 1),

    GYM_8            = array(ID => array(42, 5), BND => 1),
    GYM_9            = array(ID => array(42, 6), BND => 1),
    GYM_10           = array(ID => array(42, 7), BND => 1),
    GYM_11           = array(ID => array(42, 8), BND => 1),
    GYM_12           = array(ID => array(47, 6), BND => 1),
    GYM_13           = array(ID => array(47, 7), BND => 1),
    GYM_14           = array(ID => array(47, 8), BND => 1),

    GYM_15           = array(ID => array(43, 5), BND => 1),
    GYM_16           = array(ID => array(43, 6), BND => 1),
    GYM_17           = array(ID => array(43, 7), BND => 1),
    GYM_18           = array(ID => array(43, 8), BND => 1),
    GYM_19           = array(ID => array(48, 6), BND => 1),
    GYM_20           = array(ID => array(48, 7), BND => 1),
    GYM_21           = array(ID => array(48, 8), BND => 1),

    GYM_22           = array(ID => array(44, 5), BND => 1),
    GYM_23           = array(ID => array(44, 6), BND => 1),
    GYM_24           = array(ID => array(44, 7), BND => 1),
    GYM_25           = array(ID => array(44, 8), BND => 1),
    GYM_26           = array(ID => array(49, 6), BND => 1),
    GYM_27           = array(ID => array(49, 7), BND => 1),
    GYM_28           = array(ID => array(49, 8), BND => 1),

    GYM_29           = array(ID => array(45, 5), BND => 1),
    GYM_30           = array(ID => array(45, 6), BND => 1),
    GYM_31           = array(ID => array(45, 7), BND => 1),
    GYM_32           = array(ID => array(45, 8), BND => 0),
    GYM_33           = array(ID => array(50, 6), BND => 1),
    GYM_34           = array(ID => array(50, 7), BND => 1),
    GYM_35           = array(ID => array(50, 8), BND => 1);

    private $id;
    private $type;
    private $coords;
    private $boundary;
    private $flip;
    private $walk;
    private $animation;

    public function Tile($type) {
        $this->type = $type;
        $this->getTile();
    }

    private function getTile() {
        if ($this->type == null) {
            $this->type = ERROR;
        }
        $tile = constant("Tile::" . $this->type);
        $pos = $tile[ID];
        $bnd = $tile[BND];
        $flp = $tile[FLP];
        $wlk = $tile[WLK];
        $anm = $tile[ANM];
        $x = $pos[1]-1;
        $y = $pos[0]-1;
        $this->coords = array($x, $y);

        // Check if tile has boundary
        if ($bnd) {
            $this->boundary = true;
        } else {
            $this->boundary = false;
        }

        if ($flp) {
            $this->flip = true;
        } else {
            $this->flip = false;
        }

        if ($wlk) {
            $this->walk = true;
        } else {
            $this->walk = false;
        }

        if ($anm) {
            $this->animation = true;
        } else {
            $this->animation = false;
        }

        $this->id = $pos[0]*8+pos[1];
    }

    public function getCoords() {
        return $this->coords;
    }

    public static function getTileImage($tile, $bg = null, $return = true) {
        $tileset = imagecreatefrompng(__DIR__ . "/tiles.png");
        $pos = $tile[ID];
        $x = $pos[1];
        $y = $pos[0]-1;

        $bg_x = $bg[1];
        $bg_y = $bg[0]-1;

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
        if ($return) {
            ob_start();
        } else {
            header('Content-Type: image/png');
        }
        imagepng($img, null, 0);
        if ($return) {
            return ob_get_clean();
        }
    }

    public function hasBoundary() {
        if ($this->boundary) {
            return true;
        }
        return false;
    }

    public function hasFlip() {
        if ($this->flip) {
            return true;
        }
        return false;
    }

    public function hasWalk() {
        if ($this->walk) {
            return true;
        }
        return false;
    }

    public function hasAnimation() {
        if ($this->animation) {
            return true;
        }
        return false;
    }

    public function getType() {
        return $this->type;
    }

    public function getID() {
        return $this->id;
    }
}

?>