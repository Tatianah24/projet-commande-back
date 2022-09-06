<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/commande.php';

$database = new Database();
$db = $database->connect();

$commande = new Commande($db);

//get raw posted data
$data = json_decode(file_get_contents("php://input"));

//SET id to update
$commande->num_co = $data->num_co;
$commande->num_cli = $data->num_cli;
$commande->num_pro = $data->num_pro;
$commande->qte = $data->qte;

//create commande
if($commande->updateCommande()){
    echo json_encode(
        array('message' => 'commande updated')
    );
}
else{
    echo json_encode(
        array('message' => 'commande not updated')
    );
}