<?php 

    require_once("employeeDao.php");

    $employee = json_decode($_POST['employee']);
    employeeDao::save($employee);

?>