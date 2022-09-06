<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/client.php';

$database = new Database();
$db = $database->connect();

$client = new Client($db);

//get id
$client->num_cli = isset($_GET['num_cli']) ? $_GET['num_cli'] : die();

//get client
$client-> read_single_client();

//create array
$client_arr = array(
    'num_cli'=> $client-> num_cli,
    'nom_cli' => $client -> nom_cli
);

//make json
print_r(json_encode($client_arr));
