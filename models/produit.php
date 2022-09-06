<?php
    class Produit{
        private $produit = 'produit';
        private $con;

        public $num_pro;
        public $design;
        public $pu;

        public function __construct($db){
            $this->con = $db;
        }

        //read produit
        public function readProduit(){
            $query = 'SELECT * FROM '. $this->produit;
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        //read single produit
        public function read_single_produit(){
            $query = 'SELECT * FROM '. $this->produit . ' WHERE num_pro = ? ';
            $stmt = $this->con->prepare($query);

            //bind ID
            $stmt-> bindParam(1, $this->num_pro);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            //set properties
            $this->design = $row['design'];
            $this->pu = $row['pu'];
            $this->num_pro = $row['num_pro'];
            
        }

        //CREATE PRODUIT
        public function createProduit(){
            $query = 'INSERT INTO ' .$this->produit.'(design,pu) VALUES (?,?)';
            //prepare statement
            $stmt = $this->con->prepare($query);

            //clean data
            $this->design = htmlspecialchars(strip_tags($this->design));
            $this->pu = htmlspecialchars(strip_tags($this->pu));

            //bind data
            $stmt->bindParam(1,$this->design);
            $stmt->bindParam(2,$this->pu);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
            return false;
        }

        //UPDATE PRODUIT
        public function updateProduit(){
            $query = 'UPDATE ' .$this->produit.' SET design = ?, pu = ? WHERE num_pro = ? ';
            //prepare statement
            $stmt = $this->con->prepare($query);
            //clean data
            $this->design = htmlspecialchars(strip_tags($this->design));
            $this->pu = htmlspecialchars(strip_tags($this->pu));
            $this->num_pro = htmlspecialchars(strip_tags($this->num_pro));

            //bind data
            $stmt->bindParam(1,$this->design);
            $stmt->bindParam(2,$this->pu);
            $stmt->bindParam(3,$this->num_pro);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }

        //DELETE PRODUIT
        public function deleteProduit(){
            $query = ' DELETE FROM '. $this->produit . ' WHERE num_pro = ? ';
            $stmt = $this->con->prepare($query);
            $this->num_pro = htmlspecialchars(strip_tags($this->num_pro));
            $stmt->bindParam(1,$this->num_pro);

            //execute query
            if($stmt->execute()){
                return true;
            }
            printf("Erreur: %s \n", $this->error);
                return false;
        }
    }