<?php 

require_once("employeedao.php");


    $employees = EmployeeDao::getAll();
    $json = json_encode($employees);
    echo($json); 

?>