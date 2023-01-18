<?php

$AllData=$_POST;

error_reporting(E_ALL & ~E_NOTICE);
define("DB_HOST", "localhost");
define("DB_NAME", "skolas_parlaments");
define("DB_CHARSET", "utf8");
define("DB_USER", "root");
define("DB_PASSWORD", "arioliev3");

// (B) CONNECT TO DATABASE

$a=$_POST;

function responseDBfetch()
{

  $pdo;
  try {
    $pdo = new PDO(
      "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME, 
      DB_USER, DB_PASSWORD
    );
  } catch (Exception $ex) { exit($ex->getMessage()); }

  $stmt = $pdo->prepare("SELECT * FROM `skolas_events`");
  $stmt->execute();
  $retVal="";
  foreach ($table as &$row)
  {
    foreach ($row as &$col)
    {
      $retVal = $retVal . ($col."\n");
    }
  }
  return $retVal;
};


function writeNewEventInDB(){
    $eventName=$a["eventName"];
    $eventDesc=$a["eventDesc"];
    $contacts=$a["contacts"];
    $eventName=$a["eventName"];

};

function addNewItemsToDb()
{

};


function saveImage($data, $type, $id)
{
    if (preg_match('/^data:image\/(\w+);base64,/', $data)) {

        $data = substr($data, strpos($data, ',') + 1);
        $type = strtolower($type); // jpg, png, gif
    
        if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {//проверить?
            throw new \Exception('not image');
        }
        $data = str_replace( ' ', '+', $data );
        $data = base64_decode($data);
    
        if ($data === false) {
            throw new \Exception('nope base64_decode');
        }
    } else {
        throw new \Exception('did not match data URI with image data');
    }
    file_put_contents("attachedImages/img.{$type}", $data);
}
//saveImage($AllData["itemImg"], $AllData["itemImgType"], );

echo(responseDBfetch());