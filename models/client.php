<?php
    class Client{
        private $client = 'client';
        private $con;

        public $num_cli;
        public $nom_cli;

        public function __construct($db){
            $this->con = $db;
        }

        //read client
        public function readClient(){
            $query = 'SELECT * FROM '. $this->client;
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        //read single client
        public function read_single_client(){
            $query = 'SELECT * FROM '. $this->client . ' WHERE num_cli = ? ';
            $stmt = $this->con->prepare($query);

            //bind ID
            $stmt-> bindParam(1, $this->num_cli);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            //set properties
            $this->nom_cli = $row['nom_cli'];
            $this->num_cli = $row['num_cli'];
            
        }

        //CREATE CLIENT
        public function createClient(){
            $query = 'INSERT INTO ' .$this->client.'(nom_cli) VALUES (?)';
            //prepare statement
            $stmt = $this->con->prepare($query);

            //clean data
            $this->nom_cli = htmlspecialchars(strip_tags($this->nom_cli));

            //bind data
            $stmt->bindParam(1,$this->nom_cli);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
            return false;
        }

        //UPDATE CLIENT
        public function updateClient(){
            $query = 'UPDATE ' .$this->client.' SET nom_cli = ? WHERE num_cli = ? ';
            //prepare statement
            $stmt = $this->con->prepare($query);
            //clean data
            $this->nom_cli = htmlspecialchars(strip_tags($this->nom_cli));
            $this->num_cli = htmlspecialchars(strip_tags($this->num_cli));

            //bind data
            $stmt->bindParam(1,$this->nom_cli);
            $stmt->bindParam(2,$this->num_cli);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }

        //DELETE CLIENT
        public function deleteClient(){
            $query = ' DELETE FROM '. $this->client . ' WHERE num_cli = ? ';
            $stmt = $this->con->prepare($query);
            $this->num_cli = htmlspecialchars(strip_tags($this->num_cli));
            $stmt->bindParam(1,$this->num_cli);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }
    }