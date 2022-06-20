<?php 

$parent = dirname(__DIR__);

require_once($parent."/view/genderDao.php");

    $genders = GenderDao::getAll();
    $json = json_encode($genders);
    echo($json); 

?>
