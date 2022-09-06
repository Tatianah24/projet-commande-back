<?php
    class Chiffre{
        private $client = 'client';
        private $produit = 'produit';
        private $commande = 'commande';
        private $con;

        public $num_cli;
        public $nom_cli;
        public $chiffre;

        public function __construct($db){
            $this->con = $db;
        }

        //read chiffre d'affaire
        public function chiffreAffaire(){
            $query = 'SELECT client.num_cli, client.nom_cli, sum(commande.qte * produit.pu) as chiffre FROM ' .$this->client. ','.$this->produit. ','.$this->commande.' WHERE produit.num_pro = commande.num_pro AND commande.num_cli = client.num_cli GROUP BY client.num_cli';
            $stmt = $this->con->prepare($query);
            $stmt->execute();
            return $stmt;
            // $row = $stmt->fetch(PDO::FETCH_ASSOC);
            // $this->num_cli = $row['num_cli'];
            // $this->nom_cli = $row['nom_cli'];
            // $this->chiffre = $row['chiffre'];

            
        }
    }