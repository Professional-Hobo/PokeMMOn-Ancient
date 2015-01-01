<?php
require_once("config.php");

class Database
{
    private $db;

    public function __construct() {
        $this->connect();
    }

    public function connect() {
        global $config;
        try {
            $general = $config->settings->db->general;
            $this->db = new PDO("mysql:host=localhost;port=3306;dbname=" . $general->database, $general->user, $general->password);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            echo "Something bad happened. Please let us know.";
            die;
        }
    }

    public function con() {
        return $this->db;
    }

    public static function doesExist($table, $fieldname, $value, $returnObject = false) {
        $db = new self();
        $statement = $db->con()->prepare("SELECT * FROM `$table` WHERE `$fieldname` = ?");
        $statement->execute(array($value));
        $info = $statement->FetchObject();
        
        // If return object
        if ($returnObject) {
            if ($table == "users") {
                require_once("User.class.php");
                return User::withValue($info->username);
            } else {
                return $info;
            }
        }

        // Return boolean
        if ($info != null) {
            return 1;
        }
        return 0;
    }

    public static function numberOfEntries($table, $fieldname = null, $value = null) {
        $db = new self();

        if ($fieldname == null) {
            $statement = $db->con()->prepare("SELECT * FROM `$table`");
            $statement->execute();
        } else {
            $statement = $db->con()->prepare("SELECT * FROM `$table` WHERE `$fieldname` = ?");
            $statement->execute(array($value));
        }

        $num_rows = $statement->rowCount();
        return $num_rows;
    }
}
?>