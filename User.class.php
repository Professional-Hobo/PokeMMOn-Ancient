<?php
require_once("Database.class.php");

class User
{
    private $id;
    private $username;
    private $password;

    public function __construct() {
        $this->id       = 0;
        $this->username = null;
        $this->password = null;
    }

    public static function get($username) {
        $instance = new self();
        $userdata = $instance->getUserInfo($username);

        $instance->id = $userdata->id;
        $instance->username = $userdata->username;
        $instance->password = $userdata->password;

        return $instance;
    }

    public static function add($username, $password) {
        $db = new Database;
        if (Database::doesExist("users", "username", $username)) {
            return false;
        } else {
            $statement = $db->con()->prepare("INSERT INTO `users` (`username`, `password`) VALUES (?, ?)");
            $password = User::hashPassword($password);
            $statement->execute(array($username, $password));
            return true;
        }
    }

    private function getUserInfo($user) {
        $db = new Database;
        $statement = $db->con()->prepare("SELECT * FROM `users` WHERE `username` = ?");
        $statement->execute(array($user));
        return $statement->fetchObject();
    }

    public static function hashPassword($password) {
        $options = [
            'cost' => 12
        ];
        return password_hash($password, PASSWORD_DEFAULT, $options);
    }

    public static function checkLogin($username, $password) {
        $info = User::get($username);
        if (password_verify($password, $info->getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    public function getPassword() {
        return $this->password;
    }

    public function getID() {
        return $this->id;
    }
}
?>
