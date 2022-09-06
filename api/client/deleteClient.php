<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

//get raw posted data
//$data = json_decode(file_get_contents("php://input"));
$client->num_cli = isset($_GET['num_cli']) ? $_GET['num_cli'] : die();

//SET id to update
//$client->num_cli = $data->num_cli;

//create client
if($client->deleteClient()){
    echo json_encode(
        array('message' => 'Client deleted')
    );
}
else{
    echo json_encode(
        array('message' => 'Client not deleted')
    );
}