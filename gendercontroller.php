<?php 

require_once("genderdao.php");


    $genders = GenderDao::getAll();
    $json = json_encode($genders);
    echo($json); 

?>
