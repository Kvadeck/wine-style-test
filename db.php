<?php

class WinestyleDB extends SQLite3
{
    function __construct()
    {
        $this->open("winestyle.db");
    }
}

$db = new WinestyleDB();

$db->exec('DROP TABLE image_sizes;');

$db->exec('CREATE TABLE IF NOT EXISTS image_sizes(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name string NOT NULL, 
            size string NOT NULL)
');

$db->exec("INSERT INTO image_sizes (name, size) VALUES ('big', '800*600')");
$db->exec("INSERT INTO image_sizes (name, size) VALUES ('med', '640*480')");
$db->exec("INSERT INTO image_sizes (name, size) VALUES ('min', '320*240')");
$db->exec("INSERT INTO image_sizes (name, size) VALUES ('mic', '150*150')");

