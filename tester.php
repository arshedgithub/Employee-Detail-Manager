<?php

echo("Testing...!");
echo("<br><br>");

// require_once("genderdao.php");
require_once("employeedao.php");

// $gender = GenderDao::getById(1);
$employee = EmployeeDao::getById(2);
$employees = EmployeeDao::getAll();
var_dump($employees);

// $genders = GenderDao::getAll();

// echo("<br><br>");

// json syntax 
// $json = "[";

//     foreach($genders as $itm=>$gender){
//         $id = $gender->getId();
//         $name = $gender->getName();
//         $json = $json."{'id':$id,'name':'$name'},";

//     }

//     $json = rtrim($json,",");

// $json = $json."]";

// echo($json);

?>