<?php
// multiplayersystemTORM - Web Status Bridge
header('Content-Type: application/json');

$response = [
    "system" => "multiplayersystemTORM",
    "php_bridge" => "active",
    "status" => "Ready for Node.js sync",
    "time" => date('Y-m-d H:i:s')
];

echo json_encode($response);
?>
