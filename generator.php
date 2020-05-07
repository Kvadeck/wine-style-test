<?php

// !TODO : Get image size from sql table base
// !TODO : Create image files in directory cache
// !TODO : Try catch for exceptions
// !TODO : Regular expression for get name parameter
// !TODO : Default arguments
// !TODO : Check if all var exist's
//  TODO : Add files to cache folder with sizes
//  TODO : When photo resized get it from cache folder

// error_reporting(E_ALL);

/**
 * @return void
 * @throws Exception
 */
function getDbFile() {
    if (!file_exists("db.php")) {
        throw new Exception("Db file not found.");
    }
    require("db.php");
}

try {
    getDbFile();
} catch (Exception $e) {
    echo $e->getMessage();
}

/**
 * @return array
 * @throws Exception
 */
function getSizesfromDB()
{
    $db = new WinestyleDB();
    $result = $db->query('SELECT * FROM image_sizes');
    $imageSizesArr = [];

    if (!is_null($result)) {
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $imageSizesArr[] = $row;
        }
    } else {
        throw new Exception("Table data is empty");
    }
    return $imageSizesArr;
}


/**
 * @param string $filename
 * @param integer $max_width
 * @param integer $max_height
 * @return false|resource
 * @throws Exception
 */
function resizeImage($filename, $max_width = 800, $max_height = 600)
{
    if (!(list($orig_width, $orig_height) = getimagesize($filename))) {
        throw new Exception("This file not exist");
    }

    $width = $orig_width;
    $height = $orig_height;

    # proportions taller
    if ($height > $max_height) {
        $width = ($max_height / $height) * $width;
        $height = $max_height;
    }

    # proportions wider
    if ($width > $max_width) {
        $height = ($max_width / $width) * $height;
        $width = $max_width;
    }

    $image_p = imagecreatetruecolor($width, $height);
    $image = imagecreatefromjpeg($filename);
    imagecopyresampled($image_p, $image, 0, 0, 0, 0,
        $width, $height, $orig_width, $orig_height);

    return $image_p;
}

/**
 * @return void
 * @throws Exception
 */
function requestResizeImage()
{
    $getSize = $_GET['size'];
    $getName = $_GET['name'];

    $imageDir = __DIR__ . "/gallery/" . $getName . ".jpg";
    $cacheDir = __DIR__ . "/cache/" . $getName . ".jpg";

    $invalidCharPattern = '/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/';
    $delSpacePattern = '/\s+/';

    if (preg_match($invalidCharPattern, $getName)) {
        throw new Exception("Get parameter name contains invalid characters");
    }

    if (empty($getName) && empty($getSize)) {
        throw new Exception("Get parameter name or size is empty");
    }

    try {
        $sizesArr = getSizesfromDB();
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    if (empty($sizesArr)) {
        throw new Exception("Sizes array is empty");
    }

    foreach ($sizesArr as $key => $value) {
        if ($value['name'] == $getSize) {
            $sizePieces = explode("*", preg_replace($delSpacePattern, '', $value['size']));
            try {
                $photoOut = resizeImage($imageDir, $sizePieces[0], $sizePieces[1]);
                if (!file_exists($cacheDir)) {
                    imagejpeg($photoOut, $cacheDir);
                }
                header('Content-type: image/jpeg');
                imagejpeg($photoOut);
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        }
    }
}

try {
    requestResizeImage();
} catch (Exception $e) {
    echo $e->getMessage();
}
