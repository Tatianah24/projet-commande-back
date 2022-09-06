<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/produit.php';

$database = new Database();
$db = $database->connect();

$produit = new Produit($db);

//get id
$produit->num_pro = isset($_GET['num_pro']) ? $_GET['num_pro'] : die();

//get client
$produit-> read_single_produit();

//create array
$produit_arr = array(
    'num_pro'=> $produit-> num_pro,
    'design' => $design -> design,
    'pu' => $pu -> pu
);

//make json
print_r(json_encode($produit_arr));
