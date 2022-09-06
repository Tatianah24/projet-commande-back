<?php
    class Commande{
        private $commande = 'commande';
        private $con;

        public $num_co;
        public $num_cli;
        public $num_pro;
        public $qte;

        public function __construct($db){
            $this->con = $db;
        }

        //read commande
        public function readCommande(){
            $query = 'SELECT * FROM '. $this->commande;
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        //read single commande
        public function read_single_commande(){
            $query = 'SELECT * FROM '. $this->commande . ' WHERE num_cli = ? ';
            $stmt = $this->con->prepare($query);

            //bind ID
            $stmt-> bindParam(1, $this->num_cli);
            $stmt->execute();

           /* $row = $stmt->fetch(PDO::FETCH_ASSOC);

            //set properties
            
            $this->num_pro = $row['num_pro'];
            $this->qte = $row['qte'];
            $this->num_co = $row['num_co'];
            $this->num_cli = $row['num_cli'];*/
            return $stmt;
            
        }
        //CREATE COMMANDE
        public function createCommande(){
            $query = 'INSERT INTO ' .$this->commande.'(num_cli,num_pro,qte) VALUES (?,?,?)';
            //prepare statement
            $stmt = $this->con->prepare($query);

            //clean data
            $this->num_cli = htmlspecialchars(strip_tags($this->num_cli));
            $this->num_pro = htmlspecialchars(strip_tags($this->num_pro));
            $this->qte = htmlspecialchars(strip_tags($this->qte));

            //bind data
            $stmt->bindParam(1,$this->num_cli);
            $stmt->bindParam(2,$this->num_pro);
            $stmt->bindParam(3,$this->qte);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
            return false;
        }

        //UPDATE COMMANDE
        public function updateCommande(){
            $query = 'UPDATE ' .$this->commande.' SET qte = ? WHERE num_co = ? ';
            //prepare statement
            $stmt = $this->con->prepare($query);
            //clean data
            $this->qte = htmlspecialchars(strip_tags($this->qte));
            $this->num_co = htmlspecialchars(strip_tags($this->num_co));

            //bind data
            $stmt->bindParam(1,$this->qte);
            $stmt->bindParam(2,$this->num_co);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }

        //DELETE COMMANDE
        public function deleteCommande(){
            $query = ' DELETE FROM '. $this->commande . ' WHERE num_co = ? ';
            $stmt = $this->con->prepare($query);
            $this->num_co = htmlspecialchars(strip_tags($this->num_co));
            $stmt->bindParam(1,$this->num_co);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }
    }