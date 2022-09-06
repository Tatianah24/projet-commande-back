<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);
$result = $client->readClient();
//get row count
$num = $result->rowCount();

    if($num > 0){
        //client array
        $client_arr = array();
        $client_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $client_item = array(
                'num_cli' => $num_cli,
                'nom_cli' => $nom_cli
            );
            //push to data
            array_push($client_arr['data'], $client_item);
        }
        //turn to json & output
        echo json_encode($client_arr);
        
    }
    else{
        //no posts
        echo json_encode(
            array('message' => 'No client found')
        );
    }
