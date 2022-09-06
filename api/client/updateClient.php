<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

//get raw posted data
$data = json_decode(file_get_contents("php://input"));

//SET id to update
$client->num_cli = $data->num_cli;

$client->nom_cli = $data->nom_cli;

//create client
if($client->updateClient()){
    echo json_encode(
        array('message' => 'Client updated')
    );
}
else{
    echo json_encode(
        array('message' => 'Client not updated')
    );
}