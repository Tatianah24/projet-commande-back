<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/commande.php';

$database = new Database();
$db = $database->connect();

$commande = new Commande($db);

//get raw posted data
$commande->num_co = isset($_GET['num_co']) ? $_GET['num_co'] : die();

//SET id to update
//$commande->num_co = $data->num_co;

//create commande
if($commande->deleteCommande()){
    echo json_encode(
        array('message' => 'commande deleted')
    );
}
else{
    echo json_encode(
        array('message' => 'Commande not deleted')
    );
}