<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/commande.php';

$database = new Database();
$db = $database->connect();

$commande = new commande($db);

$commande->num_cli = isset($_GET['num_cli']) ? $_GET['num_cli'] : die();
$result = $commande->read_single_commande();
//get row count
$num = $result->rowCount();

    if($num > 0){
        //commande array
        $commande_arr = array();
        $commande_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $commande_item = array(
                'num_co'=> $num_co,
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
            array('message' => 'No commande single found')
        );
    }
// //get id
// $commande->num_cli = isset($_GET['num_cli']) ? $_GET['num_cli'] : die();

// //get client
// $commande-> read_single_commande();

// //create array
// $commande_arr = array(
//     'num_co'=> $commande-> num_co,
//     'num_cli' => $commande -> num_cli,
//     'num_pro' => $commande -> num_pro,
//     'qte' => $commande -> qte
// );

// //make json
// print_r(json_encode($commande_arr));
