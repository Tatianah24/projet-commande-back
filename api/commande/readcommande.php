<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/commande.php';

$database = new Database();
$db = $database->connect();

$commande = new Commande($db);
$result = $commande->readCommande();
//get row count
$num = $result->rowCount();

    if($num > 0){
        //commande array
        $commande_arr = array();
        $commande_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $commande_item = array(
                'num_co' => $num_co,
                'num_cli' => $num_cli,
                'num_pro' => $num_pro,
                'qte' => $qte
            );
            //push to data
            array_push($commande_arr['data'], $commande_item);
        }
        //turn to json & output
        echo json_encode($commande_arr);
    }
    else{
        //no posts
        echo json_encode(
            array('message' => 'No commande found')
        );
    }
