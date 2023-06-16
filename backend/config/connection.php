<?php
$host = 'localhost'; 
$port = '5432'; 
$dbname = 'postgres'; 
$user = 'postgres'; 
$password = 'alekweofnwofij23'; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Error on connect: ' . $e->getMessage();
}
?>
