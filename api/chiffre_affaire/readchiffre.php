<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/chiffre.php';

$database = new Database();
$db = $database->connect();

$chiffre = new Chiffre($db);



//get chiffre

$result = $chiffre->chiffreAffaire();
//get row count
$num = $result->rowCount();

    if($num > 0){
        //commande array
        $commande_arr = array();
        $commande_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $commande_item = array(
                'num_cli'=> $num_cli,
                'nom_cli' => $nom_cli,
                'chiffre' => $chiffre
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
// //create array
// $chiffre_arr = array(
//     'num_cli'=> $chiffre-> num_cli,
//     'nom_cli' => $chiffre -> nom_cli,
//     'chiffre' => $chiffre -> chiffre
// );

// //make json
// print_r(json_encode($chiffre_arr));

