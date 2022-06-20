<?php 

$parent = dirname(__DIR__);

require_once($parent."/view/employeeDao.php");

// var_dump($GLOBALS);
// echo($_SERVER['REQUEST_METHOD']);

if($_SERVER['REQUEST_METHOD'] == "GET"){

    $hasName = !empty($_GET['name']);
    $hasGender = !empty($_GET['gender']);

    if ($hasName) $name = $_GET['name'];
    if ($hasGender) $gender = $_GET['gender'];

    $employees = null;
    if (!$hasName && !$hasGender)  $employees = EmployeeDao::getAll();
    if ($hasName && !$hasGender) $employees = EmployeeDao::getAllByName($name);
    if (!$hasName && $hasGender) $employees = EmployeeDao::getAllByGender($gender);
    if ($hasName && $hasGender) $employees  = EmployeeDao::getAllByNameAndGender($name,$gender);

    $json = json_encode($employees);
    echo($json); 

}

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $employee = json_decode($_POST['employee']);
    employeeDao::save($employee);
}

if($_SERVER['REQUEST_METHOD'] == "DELETE"){
    $id = $_GET['id'];
    $hasId = !empty($id);

    if ($hasId) EmployeeDao::delete($id);
}

?>