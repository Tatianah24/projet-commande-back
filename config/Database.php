<?php
    class Database {
        private $host = 'localhost';
        private $db_name = 'gestion_co';
        private $username = 'postgres';
        private $password = 'tatianah24';
        private $con;

        public function connect(){
            $this->con = null;
            try{
                $this->con = new PDO('pgsql:host='. $this->host . ';dbname='. $this->db_name, $this->username, $this->password);
                $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOEXCEPTION $e){
                echo 'Connection Error:' . $e->getMessage();
            }
            return $this->con;
        }
    }