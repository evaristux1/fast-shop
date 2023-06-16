<?php

require_once dirname(__FILE__) . '/../config/connection.php';
require_once dirname(__FILE__) . '/../classes/productHandler.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $requestData = json_decode($requestBody, true);
    $productName = $requestData['productName'] ?? '';
    $productType = $requestData['productType'] ?? '';
    $price = $requestData['price'] ?? '';

    if (empty($productName) || empty($productType) || empty($price)) {
        return ['success' => false, 'message' => 'All fields are required.'];
    }


    $productHandler = new ProductHandler($conn);
    $response = $productHandler->createProduct(
        $productName,
        $productType,
        $price
    );
    echo json_encode($response);
} else {
    $response = ['success' => false, 'message' => 'Invalid request method.'];
    echo json_encode($response);
}
