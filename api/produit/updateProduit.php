<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/produit.php';

$database = new Database();
$db = $database->connect();

$produit = new Produit($db);

//get raw posted data
$data = json_decode(file_get_contents("php://input"));

//SET id to update
$produit->num_pro = $data->num_pro;
$produit->design = $data->design;
$produit->pu = $data->pu;

//create produit
if($produit->updateProduit()){
    echo json_encode(
        array('message' => 'Produit updated')
    );
}
else{
    echo json_encode(
        array('message' => 'Produit not updated')
    );
}