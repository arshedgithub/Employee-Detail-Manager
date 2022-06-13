<?php

    class CommonDao{

        public static function getConnection(){

            $servername = "localhost";
            $username = "root";
            $password = "1234";
            $database = "earth1";

            $dbconn = new mysqli($servername, $username, $password, $database);

            if (!$dbconn){
                die("Connection failed: " . $dbconn->connect_error);

            }
            
            return $dbconn;
        }
        
    }

?>