<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

//get raw posted data
$data = json_decode(file_get_contents("php://input"));

$client->nom_cli = $data->nom_cli;

//create client
if($client->createClient()){
    echo json_encode(
        array('message' => 'Client created')
    );
}
else{
    echo json_encode(
        array('message' => 'Client not created')
    );
}