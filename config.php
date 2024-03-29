<?php
chdir(dirname(__FILE__));
class Config
{
    public $settings;

    public function __construct() {
        $this->parseSettings();
    }

    private function parseSettings() {
        $this->settings = json_decode(file_get_contents("settings.json"));
    }

    public function getName() {
        return $this->settings->general->name;
    }

    public function getPort() {
        return $this->settings->game->port;
    }
}
$config = new Config;
?>
