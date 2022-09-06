<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/produit.php';

$database = new Database();
$db = $database->connect();

$produit = new Produit($db);
$result = $produit->readProduit();
//get row count
$num = $result->rowCount();

    if($num > 0){
        //produit array
        $produit_arr = array();
        $produit_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $produit_item = array(
                'num_pro' => $num_pro,
                'design' => $design,
                'pu' => $pu
            );
            //push to data
            array_push($produit_arr['data'], $produit_item);
        }
        //turn to json & output
        echo json_encode($produit_arr);
    }
    else{
        //no posts
        echo json_encode(
            array('message' => 'No produit found')
        );
    }
