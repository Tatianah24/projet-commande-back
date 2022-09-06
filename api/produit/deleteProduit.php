<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/produit.php';

$database = new Database();
$db = $database->connect();

$produit = new Produit($db);

//get raw posted data
$produit->num_pro = isset($_GET['num_pro']) ? $_GET['num_pro'] : die();

//SET id to update
//$produit->num_pro = $data->num_pro;

//create produit
if($produit->deleteProduit()){
    echo json_encode(
        array('message' => 'Produit deleted')
    );
}
else{
    echo json_encode(
        array('message' => 'Produit not deleted')
    );
}