<?php

$parent = dirname(__DIR__);

require_once($parent."/db.php");
require_once($parent."/model/gender.php");

    class GenderDao{

        public static function getById($id){

            $gender = new Gender();

            $sql = "SELECT * FROM gender WHERE id =$id";
            $dbconn = CommonDao::getConnection();
            $result = $dbconn->query($sql);
            $row = $result->fetch_assoc();

            $gender->setId($row['id']);
            $gender->setName($row['name']);

            return $gender;


        }
        public static function getAll(){

            $genders = array();


            $sql = "SELECT * FROM gender";
            $dbconn = CommonDao::getConnection();
            $result = $dbconn->query($sql);

            while($row = $result->fetch_assoc()){

                $gender = new Gender();

                $gender->setId($row['id']);
                $gender->setName($row['name']);

                array_push($genders,$gender);
            }

            return $genders;

        }

    }

?>