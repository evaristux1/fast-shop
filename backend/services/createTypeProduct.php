<?php

require_once dirname(__FILE__) . '/../config/connection.php';
require_once dirname(__FILE__) . '/../classes/productTypeHandler.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $requestData = json_decode($requestBody, true);
    $name = $requestData['typeName'] ?? '';
    $taxPercentage = $requestData['taxPercentage'] ?? '';

    if (empty($name) || empty($taxPercentage)) {
        $response = ['success' => false, 'message' => 'All fields are required.'];
        echo json_encode($response);
        exit;
    }

    $productTypeHandler = new ProductTypeHandler($conn);
    $response = $productTypeHandler->createProductType($name, $taxPercentage);
    echo json_encode($response);
} else {
    $response = ['success' => false, 'message' => 'Invalid request method.'];
    echo json_encode($response);
}
