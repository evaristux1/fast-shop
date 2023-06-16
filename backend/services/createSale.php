<?php

require_once dirname(__FILE__) . '/../config/connection.php';
require_once dirname(__FILE__) . '/../classes/saleHandler.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestBody = file_get_contents('php://input');
    $requestData = json_decode($requestBody, true);
    
    $saleItems = $requestData['saleItems'] ?? [];
    
    if (empty($saleItems)) {
        $response = ['success' => false, 'message' => 'Sale items are required.'];
        echo json_encode($response);
        exit;
    }
    
    $saleHandler = new SaleHandler($conn);
    $saleId = $saleHandler->createSale($saleItems);
    
    if (!$saleId) {
        $response = ['success' => false, 'message' => 'Failed to create sale.'];
        echo json_encode($response);
        exit;
    }
    
    foreach ($saleItems as $item) {
        $productId = $item['id'] ?? '';
        $quantity = $item['quantity'] ?? '';
        $price = $item['price'] ?? '';
        $taxPercentage = $item['taxPercentage'] ?? '';
        
        if (empty($productId) || empty($quantity) || empty($price) || empty($taxPercentage)) {
            continue; // Skip the item if any required field is missing
        }
        
        $itemId = $saleHandler->createSaleItem($saleId, $productId, $quantity, $price, $taxPercentage);
        
        if (!$itemId) {
            $response = ['success' => false, 'message' => 'Failed to create sale item.'];
            echo json_encode($response);
            exit;
        }
    }
    
    $response = ['success' => true, 'message' => 'Sale created successfully.'];
    echo json_encode($response);
} else {
    $response = ['success' => false, 'message' => 'Invalid request method.'];
    echo json_encode($response);
}
