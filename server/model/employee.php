<?php

    class Employee{

        public $id;
        public $name;
        public $age;
        public $gender;

        function __construct(){}

        function getId(){ return $this->id; }
        function setId($id){ $this->id = $id; }

        function getName(){ return $this->name; }
        function setName($name){ $this->name = $name; }

        function getAge(){ return $this->age; }
        function setAge($age){ $this->age = $age; }

        function getGender(){ return $this->gender; }
        function setGender($gender){ $this->gender = $gender; }
        
    }

?>

