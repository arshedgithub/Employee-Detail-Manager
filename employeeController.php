<?php 

require_once("employeeDao.php");


    $employees = EmployeeDao::getAll();
    $json = json_encode($employees);
    echo($json); 

?>